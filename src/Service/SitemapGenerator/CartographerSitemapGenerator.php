<?php

declare(strict_types=1);

namespace App\Service\SitemapGenerator;

use Tackk\Cartographer\Sitemap;

final class CartographerSitemapGenerator implements SitemapGeneratorInterface
{
    private Sitemap $sitemap;

    public function __construct(Sitemap $sitemap)
    {
        $this->sitemap = $sitemap;
    }

    public function addUrl(SitemapUrl $url): SitemapGeneratorInterface
    {
        $this->sitemap->add(
            $url->getLocation(),
            $url->getLastModifiedDate(),
            $url->getChangeFrequency(),
            $url->getPriority()
        );

        return $this;
    }

    public function toString(): string
    {
        return $this->sitemap->toString();
    }
}
