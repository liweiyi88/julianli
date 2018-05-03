<?php
declare(strict_types=1);

namespace App\Tests\Service\CloudStorage\Factory;

use App\Service\CloudStorage\Factory\S3Factory;
use PHPUnit\Framework\TestCase;

class S3FactoryTest extends TestCase
{
    public function testCreate(): void
    {
        $s3Factory = new S3Factory('test_key', 'test_region', 'secret', 'latest');
        $s3Client = $s3Factory->create();
        self::assertSame('test_region', $s3Client->getRegion());
    }
}
