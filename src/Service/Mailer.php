<?php

namespace App\Service;

use Swift_Mailer;
use Swift_Message;

class Mailer
{
    public const CONTENT_TEXT = 'text/plain';

    private $mailer;

    public function __construct(Swift_Mailer $mailer)
    {
        $this->mailer = $mailer;
    }

    public function sendEmail(Swift_Message $message): void
    {
        $this->mailer->send($message);
    }
}
