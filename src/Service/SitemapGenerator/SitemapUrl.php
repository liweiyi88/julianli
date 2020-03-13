<?php

declare(strict_types=1);

namespace App\Service\SitemapGenerator;

final class SitemapUrl
{
    private string $location;
    private ?string $lastModifiedDate;
    private ?string $changeFrequency;
    private ?float $priority;

    public function __construct(
        string $location,
        ?string $lastModifiedDate = null,
        ?string $changeFrequency = null,
        ?float $priority = null
    ) {

        $this->location = $location;
        $this->lastModifiedDate = $lastModifiedDate;
        $this->changeFrequency = $changeFrequency;
        $this->priority = $priority;
    }

    public function getLocation(): string
    {
        return $this->location;
    }

    public function getLastModifiedDate(): ?string
    {
        return $this->lastModifiedDate;
    }

    public function getChangeFrequency(): ?string
    {
        return $this->changeFrequency;
    }

    public function getPriority(): ?float
    {
        return $this->priority;
    }
}
