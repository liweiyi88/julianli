<?php
declare(strict_types=1);

namespace App\Service\CloudStorage\Factory;

use Aws\S3\S3Client;

final class S3Factory
{
    public static function create(string $key, string $region, string $secret, string $version): S3Client
    {
        return new S3Client([
            'version'     => $version,
            'region'      => $region,
            'credentials' => [
                'key'    => $key,
                'secret' => $secret,
            ]
        ]);
    }
}
