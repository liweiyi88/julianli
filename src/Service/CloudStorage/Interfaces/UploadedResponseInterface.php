<?php
declare(strict_types=1);

namespace App\Service\CloudStorage\Interfaces;

interface UploadedResponseInterface
{
    public function getDestination(): string;
}