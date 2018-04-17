<?php
declare(strict_types=1);

namespace App\Service\CloudStorage;

use Aws\Result;

class S3UploadedResponse implements UploadedResponseInterface
{
    /**
     * @var \Aws\Result $result
     */
    private $result;

    public function __construct(Result $result)
    {
        $this->result = $result;
    }

    /**
     * @return string
     */
    public function getDestination(): string
    {
        return $this->result->toArray()['ObjectURL'];
    }
}