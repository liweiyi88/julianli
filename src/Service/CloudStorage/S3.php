<?php
declare(strict_types=1);

namespace App\Service\CloudStorage;

use App\Service\CloudStorage\Interfaces\CloudStorageInterface;
use App\Service\CloudStorage\Interfaces\UploadedResponseInterface;
use Aws\S3\S3Client;
use Symfony\Component\OptionsResolver\OptionsResolver;

class S3 implements CloudStorageInterface
{
    public const DEFAULT_BUCKET = 'julianli';
    public const DEFAULT_ENCRYPTION = 'AES256';
    public const DEFAULT_ACL = 'public-read';

    /** @var S3Client $s3Client */
    private $s3Client;

    public function __construct(S3Client $s3Client)
    {
        $this->s3Client = $s3Client;
    }

    /**
     * @param \Symfony\Component\OptionsResolver\OptionsResolver $resolver
     *
     * @throws \Symfony\Component\OptionsResolver\Exception\AccessException
     */
    protected function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setRequired(['Bucket', 'Key', 'SourceFile']);

        $resolver->setDefaults([
            'Bucket' => self::DEFAULT_BUCKET,
            'ACL' => self::DEFAULT_ACL,
            'ServerSideEncryption' => self::DEFAULT_ENCRYPTION
        ]);
    }

    /**
     * @param array $options
     *
     * @return \App\Service\CloudStorage\Interfaces\UploadedResponseInterface
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
}
