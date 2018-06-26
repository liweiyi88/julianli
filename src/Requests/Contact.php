<?php

namespace App\Requests;

use Symfony\Component\Validator\Constraints as Assert;

class Contact
{
    /**
     * @Assert\NotBlank(message="How can I call you?")
     */
    protected $name;

    /**
     * @Assert\NotBlank(message="I could not contact you without an email address.")
     * @Assert\Email(message="I could not contact you through an invalid email address.")
     */
    protected $email;

    /**
     * @Assert\NotBlank(message="Can you specify the subject?")
     */
    protected $subject;

    /**
     * @Assert\NotBlank(message="Tell me something please.")
     */
    protected $message;

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

    public function setMessage(string $message): void
    {
        $this->message = $message;
    }
}
