<?php
declare(strict_types=1);

namespace App\Service\CloudStorage;

interface CloudStorageInterface
{
    /**
     * @param array $config
     *
     * @return UploadedResponseInterface
     */
    public function upload(array $config): UploadedResponseInterface;
}