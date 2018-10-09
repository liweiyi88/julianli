<?php

namespace App\Requests;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *      collectionOperations={
 *          "post"={
 *              "path"="/contact",
 *          },
 *      },
 *      itemOperations={},
 * )
 */
class Contact
{
    /**
     * @Assert\NotBlank(message="How can I call you?")
     */
    public $name;

    /**
     * @Assert\NotBlank(message="I could not contact you without an email address.")
     * @Assert\Email(message="I could not contact you through an invalid email address.")
     */
    public $email;

    /**
     * @Assert\NotBlank(message="Can you specify the subject?")
     */
    public $subject;

    /**
     * @Assert\NotBlank(message="Tell me something please.")
     */
    public $message;
}
