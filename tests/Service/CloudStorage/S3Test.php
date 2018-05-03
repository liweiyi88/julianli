<?php

namespace App\Tests\Service\CloudStorage;

use App\Service\CloudStorage\S3;
use Aws\Result;
use Aws\S3\S3Client;
use PHPUnit\Framework\TestCase;

class S3Test extends TestCase
{
    public function testUpload(): void
    {
        $s3ClientStub = $this
            ->getMockBuilder(S3Client::class)
            ->disableOriginalConstructor()
            ->setMethods(['putObject'])
            ->getMock();

        $s3ClientStub
            ->method('putObject')
            ->willReturn(new Result(['ObjectURL' => 'test_url']));

        $s3 = new S3($s3ClientStub);

        self::assertSame('test_url', $s3->upload(['Key' => 'test', 'SourceFile' => 'test_file'])->getDestination());
    }
}
