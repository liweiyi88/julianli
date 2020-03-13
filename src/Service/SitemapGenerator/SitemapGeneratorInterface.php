<?php

declare(strict_types=1);

namespace App\Service\SitemapGenerator;

interface SitemapGeneratorInterface
{
    /**
     * Add site map url block data.
     */
    public function addUrl(SitemapUrl $url): self;

    /**
     * Output the site map content.
     */
    public function toString(): string;
}
