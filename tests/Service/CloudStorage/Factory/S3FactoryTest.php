<?php
declare(strict_types=1);

namespace App\Tests\Service\CloudStorage\Factory;

use App\Service\CloudStorage\Factory\S3Factory;
use PHPUnit\Framework\TestCase;

/**
 * @covers \App\Service\CloudStorage\Factory\S3Factory
 */
class S3FactoryTest extends TestCase
{
    public function testCreate(): void
    {
        $s3Client = S3Factory::create('test_key', 'test_region', 'secret', 'latest');
        self::assertSame('test_region', $s3Client->getRegion());
    }
}
