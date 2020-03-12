<?php

declare(strict_types=1);

namespace App\Service\SitemapGenerator;

interface SitemapUrlInterface
{
    public function location(): string;
    public function lastModifiedDate(): ?string;
    public function changefrequency(): ?string;
    public function priority(): ?float;
}
