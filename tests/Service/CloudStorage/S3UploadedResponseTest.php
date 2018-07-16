<?php
declare(strict_types=1);

namespace App\Tests\Service\CloudStorage;

use App\Service\CloudStorage\S3UploadedResponse;
use Aws\Result;
use PHPUnit\Framework\TestCase;

/**
 * @covers \App\Service\CloudStorage\S3UploadedResponse
 */
class S3UploadedResponseTest extends TestCase
{
    public function testGetDestination(): void
    {
        $awsResult = new Result(['ObjectURL' => 'some_url']);
        $response = new S3UploadedResponse($awsResult);

        self::assertSame('some_url', $response->getDestination());

        $awsResult = new Result();
        $response = new S3UploadedResponse($awsResult);
        self::assertNull($response->getDestination());
    }
}
