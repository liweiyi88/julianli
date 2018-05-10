<?php
declare(strict_types=1);

namespace App\Service\CloudStorage\Interfaces;

interface CloudStorageInterface
{
    public function upload(array $config): UploadedResponseInterface;
}
