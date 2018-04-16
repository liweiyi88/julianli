<?php
declare(strict_types=1);

namespace App\Service\FileStorage;

use Aws\S3\S3Client;
use Symfony\Component\OptionsResolver\OptionsResolver;

class S3 implements FileStorageInterface
{
    const DEFAULT_BUCKET = 'julianli';

    private $s3Client;

    public function __construct(S3Client $s3Client)
    {
        $this->s3Client = $s3Client;
    }

    public function put(array $options): array
    {
        $resolver = new OptionsResolver();
        $this->configureOptions($resolver);

        $options = $resolver->resolve($options);
        return $this->s3Client->putObject($options);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setRequired(['Bucket', 'Key', 'SourceFile']);

        $resolver->setDefaults([
            'Bucket' => self::DEFAULT_BUCKET,
            'ACL' => 'public-read',
            'ServerSideEncryption' => 'AES256'
        ]);
    }
}