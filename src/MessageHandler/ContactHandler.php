<?php
declare(strict_types=1);

namespace App\MessageHandler;

use App\Requests\Contact;
use App\Service\Mailer;
use Swift_Message;

class ContactHandler
{
    private $adminEmail;
    private $hostEmail;
    private $mailer;

    public function __construct(string $adminEmail, string $hostEmail, Mailer $mailer)
    {
        $this->adminEmail = $adminEmail;
        $this->hostEmail = $hostEmail;
        $this->mailer = $mailer;
    }

    public function __invoke(Contact $contact)
    {
        $content = \sprintf("Email from %s \r\nMessage: \r\n%s", $contact->getEmail(), $contact->getMessage());

        $message = (new Swift_Message($contact->getSubject()))
            ->setFrom($this->hostEmail)
            ->setTo($this->adminEmail)
            ->setBody($content, Mailer::CONTENT_TEXT);

        $this->mailer->sendEmail($message);
    }
}
