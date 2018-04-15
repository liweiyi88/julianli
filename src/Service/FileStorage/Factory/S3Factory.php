<?php
declare(strict_types=1);

namespace App\Service\FileStorage\Factory;

use Aws\S3\S3Client;

class S3Factory
{
    private $key;
    private $region;
    private $secret;
    private $version;

    public function __construct(string $key, string $region, string $secret, ?string $version = null)
    {
        $this->key = $key;
        $this->region = $region;
        $this->secret = $secret;
        $this->version = $version ?? 'latest';
    }

    /**
     * @return \Aws\S3\S3Client
     *
     * @throws \InvalidArgumentException
     */
    public function create(): S3Client
    {
        return new S3Client([
            'version'     => $this->version,
            'region'      => $this->region,
            'credentials' => [
                'key'    => $this->key,
                'secret' => $this->secret,
            ]
        ]);
    }
}