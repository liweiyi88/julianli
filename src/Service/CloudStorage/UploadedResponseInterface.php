<?php
declare(strict_types=1);

namespace App\Service\CloudStorage;

interface UploadedResponseInterface
{
    public function getDestination(): string;
}