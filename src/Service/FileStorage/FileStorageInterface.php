<?php
declare(strict_types=1);

namespace App\Service\FileStorage;

use App\Service\FileStorage\Configuration\ConfigurationInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

interface FileStorageInterface
{
    public function put(UploadedFile $file, ConfigurationInterface $config): array;
    public function delete(): array;
}