<?php

namespace App\Command;

use App\Repository\PostRepository;
use App\Service\CloudStorage\Interfaces\CloudStorageInterface;
use Doctrine\DBAL\Connection;
use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Filesystem\Exception\FileNotFoundException;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Process\Process;

class DbBackupCommand extends Command
{
    protected static $defaultName = 'db:backup';

    /**
     * @var CloudStorageInterface $cloudStorage
     */
    private $cloudStorage;

    /**
     * @var Connection $connection
     */
    private $connection;

    /**
     * @var ContainerInterface $container
     */
    private $container;

    /**
     * @var Filesystem $filesystem
     */
    private $filesystem;

    /**
     * @var LoggerInterface $logger
     */
    private $logger;

    /**
     * @var PostRepository $postRepository
     */
    private $postRepository;

    /**
     * @param CloudStorageInterface $cloudStorage
     * @param Connection $connection
     * @param ContainerInterface $container
     * @param Filesystem $filesystem
     * @param LoggerInterface $logger
     * @param PostRepository $postRepository
     *
     * @throws \Symfony\Component\Console\Exception\LogicException
     */
    public function __construct(
        CloudStorageInterface $cloudStorage,
        Connection $connection,
        ContainerInterface $container,
        Filesystem $filesystem,
        LoggerInterface $logger,
        PostRepository $postRepository
    ) {
        $this->cloudStorage = $cloudStorage;
        $this->container = $container;
        $this->connection = $connection;
        $this->filesystem = $filesystem;
        $this->logger = $logger;
        $this->postRepository = $postRepository;
        parent::__construct();
    }

    protected function configure(): void
    {
        $this->setDescription('Generate database backup file and send it to s3 bucket.');
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     *
     * @return void
     *
     * @throws \Exception
     * @throws \Symfony\Component\DependencyInjection\Exception\InvalidArgumentException
     * @throws \Symfony\Component\Filesystem\Exception\FileNotFoundException;
     * @throws \Symfony\Component\Filesystem\Exception\IOException
     * @throws \Symfony\Component\Process\Exception\LogicException
     * @throws \Symfony\Component\Process\Exception\ProcessFailedException
     * @throws \Symfony\Component\Process\Exception\RuntimeException
     */
    protected function execute(InputInterface $input, OutputInterface $output): void
    {
        if (!$this->postRepository->findUpdatedAtToday()) {
            return;
        }

        $projectDir = $this->container->getParameter('kernel.project_dir');

        $username = $this->connection->getUsername();
        $password = $this->connection->getPassword();
        $database = $this->connection->getDatabase();
        $host = $this->connection->getHost();

        $fileName = (new \DateTime('now'))->format('Ymd').'.sql';
        $filePath = $projectDir.'/'.'backup_'.$fileName;

        $process = new Process(\sprintf('mysqldump -h %s -B %s -u %s --password=%s > %s', $host, $database, $username, $password, $filePath));
        $process->mustRun();

        if (!$this->filesystem->exists($filePath)) {
            throw new FileNotFoundException('backup file not found');
        }

        try {
            $this->cloudStorage->upload([
                'Key' => 'db_backups/'.$fileName,
                'SourceFile' => $filePath
            ]);
        } catch (\Exception $e) {
            $this->logger->error($e->getMessage());
        }

        $this->filesystem->remove($filePath);
    }
}
