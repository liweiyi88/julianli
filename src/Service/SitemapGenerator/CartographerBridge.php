<?php

declare(strict_types=1);

namespace App\Service\SitemapGenerator;

use Tackk\Cartographer\Sitemap;

final class CartographerBridge implements SitemapGeneratorInterface
{
    private Sitemap $sitemap;

    public function __construct(Sitemap $sitemap)
    {
        $this->sitemap = $sitemap;
    }

    public function addUrl(SitemapUrlInterface $url): SitemapGeneratorInterface
    {
        $this->sitemap->add($url->location(), $url->lastModifiedDate(), $url->changefrequency(), $url->priority());

        return $this;
    }

    public function toString(): string
    {
        $this->sitemap->toString();
    }
}
