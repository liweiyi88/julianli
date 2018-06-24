<?php

namespace App\Service\Email;

use App\Requests\Contact;
use Swift_Mailer;
use Swift_Message;

class EmailManager
{
    public const DEFAULT_CONTENT_TYPE = 'text/plain';

    private $mailer;
    private $adminEmail;
    private $hostEmail;

    public function __construct(Swift_Mailer $mailer, string $adminEmail, string $hostEmail)
    {
        $this->mailer = $mailer;
        $this->adminEmail = $adminEmail;
        $this->hostEmail = $hostEmail;
    }

    public function sendEmail(Contact $contact): void
    {
        $this->mailer->send($this->createPlainMessageFromContact($contact));
    }

    private function createPlainMessageFromContact(Contact $contact): Swift_Message
    {
        $content = \sprintf("Email from %s \r\nMessage: \r\n%s", $contact->getEmail(), $contact->getMessage());

        $message = (new Swift_Message($contact->getSubject()))
            ->setFrom($this->hostEmail)
            ->setTo($this->adminEmail)
            ->setBody($content, self::DEFAULT_CONTENT_TYPE);

        return $message;
    }
}
