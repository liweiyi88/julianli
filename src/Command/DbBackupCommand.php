<?php

namespace App\Command;

use Doctrine\DBAL\Connection;
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
     * @param Connection $connection
     * @param ContainerInterface $container
     * @param Filesystem $filesystem
     *
     * @throws \Symfony\Component\Console\Exception\LogicException
     */
    public function __construct(Connection $connection, ContainerInterface $container, Filesystem $filesystem)
    {
        $this->container = $container;
        $this->connection = $connection;
        $this->filesystem = $filesystem;
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
     * @return int|null|void
     *
     * @throws \Symfony\Component\DependencyInjection\Exception\InvalidArgumentException
     * @throws \Symfony\Component\Filesystem\Exception\FileNotFoundException;
     * @throws \Symfony\Component\Filesystem\Exception\IOException
     * @throws \Symfony\Component\Process\Exception\LogicException
     * @throws \Symfony\Component\Process\Exception\ProcessFailedException
     * @throws \Symfony\Component\Process\Exception\RuntimeException
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $projectDir = $this->container->getParameter('kernel.project_dir');

        $username = $this->connection->getUsername();
        $password = $this->connection->getPassword();
        $database = $this->connection->getDatabase();
        $host = $this->connection->getHost();

        $file = $projectDir.'/'.'backup_'.(new \DateTime('now'))->format('Ymd').'.sql';

        $process = new Process(\sprintf('mysqldump -h %s -B %s -u %s --password=%s > %s', $host, $database, $username, $password, $file));
        $process->mustRun();

        if (!$this->filesystem->exists($file)) {
            throw new FileNotFoundException('backup file not found');
        }

        //TODO: send to S3
        $this->filesystem->remove($file);
    }
}
