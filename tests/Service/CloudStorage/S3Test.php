<?php

namespace App\Tests\Service\CloudStorage;

use App\Service\CloudStorage\S3;
use Aws\Result;
use Aws\S3\S3Client;
use PHPUnit\Framework\TestCase;

/**
 * @covers \App\Service\CloudStorage\S3
 */
class S3Test extends TestCase
{
    public function testUpload(): void
    {
        $s3ClientMock = $this
            ->getMockBuilder(S3Client::class)
            ->disableOriginalConstructor()
            ->setMethods(['putObject'])
            ->getMock();

        $s3ClientMock
            ->method('putObject')
            ->willReturn(new Result(['ObjectURL' => 'test_url']));

        $s3 = new S3($s3ClientMock);

        self::assertSame('test_url', $s3->upload(['Key' => 'test', 'SourceFile' => 'test_file'])->getDestination());
    }
}
