<?php
declare(strict_types=1);

namespace App\Service\CloudStorage\Factory;

use Aws\S3\S3Client;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class S3Factory
{
    private $key;
    private $region;
    private $secret;
    private $version;

    public function __construct(ParameterBagInterface $parameterBag)
    {
        $this->key = $parameterBag->get('aws_key');
        $this->region = $parameterBag->get('aws_s3_region');
        $this->secret = $parameterBag->get('aws_secret');
        $this->version = 'latest';
    }

    /**
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
