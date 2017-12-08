<?php

namespace App\Email;

use App\Contact\Contact;

class EmailManager
{
    private $mailer;
    private $adminEmail;
    private $hostEmail;

    public function __construct(\Swift_Mailer $mailer, $adminEmail, $hostEmail)
    {
        $this->mailer = $mailer;
        $this->adminEmail = $adminEmail;
        $this->hostEmail = $hostEmail;
    }

    public function createPlianMessageFromContact(Contact $contact)
    {
        $message = (new \Swift_Message($contact->getSubject()))
            ->setFrom($this->hostEmail)
            ->setTo($this->adminEmail)
            ->setBody('Email From: '.$contact->getEmail()."\r\nMessage: \r\n".$contact->getMessage(), 'text/plain')
        ;

        return $message;
    }

    public function sendEmail(\Swift_Message $message)
    {
        $this->mailer->send($message);
    }
}