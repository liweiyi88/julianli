<?php

namespace App\Command;

use App\Entity\Post;
use App\Repository\PostRepository;
use App\Service\SitemapGenerator\SitemapGeneratorInterface;
use App\Service\SitemapGenerator\SitemapUrl;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Filesystem\Filesystem;
use Tackk\Cartographer\ChangeFrequency;

class SitemapGenerateCommand extends Command
{
    protected static $defaultName = 'create:sitemap';

    private SitemapGeneratorInterface $sitemapGenerator;
    private string $hostUrl;
    private PostRepository $postRepository;
    private Filesystem $filesystem;
    private string $projectDir;

    public function __construct(
        SitemapGeneratorInterface $sitemapGenerator,
        PostRepository $postRepository,
        Filesystem $filesystem,
        string $hostUrl,
        string $projectDir,
        string $name = null
    ) {
        parent::__construct($name);
        $this->sitemapGenerator = $sitemapGenerator;
        $this->hostUrl = $hostUrl;
        $this->postRepository = $postRepository;
        $this->filesystem = $filesystem;
        $this->projectDir = $projectDir;
    }

    protected function configure(): void
    {
        $this
            ->setDescription('Create and write sitemap to file')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): void
    {
        $staticPageUrls = [
            new SitemapUrl(
                $this->hostUrl . '/',
                '2018-6-30',
                ChangeFrequency::YEARLY,
                0.9
            ),
            new SitemapUrl(
                $this->hostUrl . '/articles',
                '2018-6-30',
                ChangeFrequency::YEARLY,
                0.9
            ),
            new SitemapUrl(
                $this->hostUrl . '/projects',
                '2018-6-30',
                ChangeFrequency::YEARLY,
                0.9
            ),
            new SitemapUrl(
                $this->hostUrl . '/hire-me',
                '2018-6-30',
                ChangeFrequency::YEARLY,
                1
            )
        ];

        $dynamicPageUrls = [];
        $visibleArticles = $this->postRepository->findLatestPublishedPublicPosts();

        /**@var Post $article **/
        foreach ($visibleArticles as $article) {
            $dynamicPageUrls[] = new SitemapUrl(
                $this->hostUrl. '/articles/' .$article->slug,
                $article->getCreatedAt()->format('Y-m-d'),
                ChangeFrequency::MONTHLY,
                0.5
            );
        }

        foreach (\array_merge($staticPageUrls, $dynamicPageUrls) as $url) {
            $this->sitemapGenerator->addUrl($url);
        }

        $this->filesystem->dumpFile($this->projectDir. '/public/sitemap.xml', $this->sitemapGenerator->toString());
    }
}
