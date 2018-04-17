<?php
declare(strict_types=1);

namespace App\Service\CloudStorage;

use Aws\S3\S3Client;
use Symfony\Component\OptionsResolver\OptionsResolver;

class S3 implements CloudStorageInterface
{
    const DEFAULT_BUCKET = 'julianli';
    const DEFAULT_ENCRYPTION = 'AES256';
    const DEFAULT_ACL = 'public-read';

    private $s3Client;

    public function __construct(S3Client $s3Client)
    {
        $this->s3Client = $s3Client;
    }

    /**
     * @param array $options
     *
     * @return S3UploadedResponse
     *
     * @throws \Exception
     */
    public function upload(array $options): UploadedResponseInterface
    {
        $resolver = new OptionsResolver();
        $this->configureOptions($resolver);

        $options = $resolver->resolve($options);
        $result = $this->s3Client->putObject($options);
        return new S3UploadedResponse($result);
    }

    /**
     * @param OptionsResolver $resolver
     *
     * @throws \Symfony\Component\OptionsResolver\Exception\AccessException
     */
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setRequired(['Bucket', 'Key', 'SourceFile']);

        $resolver->setDefaults([
            'Bucket' => self::DEFAULT_BUCKET,
            'ACL' => self::DEFAULT_ACL,
            'ServerSideEncryption' => self::DEFAULT_ENCRYPTION
        ]);
    }
}