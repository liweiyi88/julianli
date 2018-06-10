<?php
declare(strict_types=1);

namespace App\Service\CloudStorage;

use App\Service\CloudStorage\Interfaces\UploadedResponseInterface;
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

    public function getDestination(): ?string
    {
        $array = $this->result->toArray();

        if (!isset($array['ObjectURL'])) {
            return null;
        }

        return $array['ObjectURL'];
    }
}
