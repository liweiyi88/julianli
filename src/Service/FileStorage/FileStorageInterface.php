<?php
declare(strict_types=1);

namespace App\Service\FileStorage;

interface FileStorageInterface
{
    public function put(array $config): array;
}