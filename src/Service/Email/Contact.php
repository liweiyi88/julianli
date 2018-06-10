<?php

namespace App\Service\Email;

use Symfony\Component\Validator\Constraints as Assert;

class Contact
{
    /**
     * @Assert\NotBlank(message="At least tell me how can I call you?")
     */
    private $name;

    /**
     * @Assert\Email(message="I could not contact you through an invalid email address")
     */
    private $email;

    /**
     * @Assert\NotBlank(message="A brief subject is good")
     */
    private $subject;

    /**
     * @Assert\NotBlank(message="Please let me know your request")
     */
    private $message;


    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function getSubject(): ?string
    {
        return $this->subject;
    }

    public function setSubject(string $subject): void
    {
        $this->subject = $subject;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage($message): void
    {
        $this->message = $message;
    }
}
