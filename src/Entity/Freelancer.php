<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"read"}},
 *     denormalizationContext={"groups"={"write"}}
 * )
 *
 * @ORM\Table(name="freelancer")
 * @ORM\Entity(repositoryClass="App\Repository\FreelancerRepository")
 */
class Freelancer implements UserInterface, \Serializable
{
    /**
     * @Groups({"read"})
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private ?int $id = null;

    /**
     * @ORM\Column(name="email", type="string", length=255)
     */
    private string $email;

    /**
     * @ORM\Column(name="username", type="string", length=25, unique=true)
     */
    private string $username;

    /**
     * @ORM\Column(name="password", type="string", length=255)
     */
    private string $password;

    /**
     * @Groups({"read"})
     *
     * @ORM\Column(name="first_name", type="string", length=255)
     */
    private string $firstName;

    /**
     * @Groups({"read"})
     *
     * @ORM\Column(name="last_name", type="string", length=255)
     */
    private string $lastName;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Post", mappedBy="freelancer")
     */
    private Collection $posts;

    public function __construct()
    {
        $this->posts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): void
    {
        $this->email = $email;
    }

    public function getFirstName(): string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): void
    {
        $this->firstName = $firstName;
    }

    public function getLastName(): string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): void
    {
        $this->lastName = $lastName;
    }

    public function getPosts(): Collection
    {
        return $this->posts;
    }

    public function setPosts(Collection $posts): void
    {
        $this->posts = $posts;
    }

    public function getRoles(): array
    {
        return ['ROLE_USER'];
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): void
    {
        $this->password = $password;
    }

    public function getSalt(): ?string
    {
        return null;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function setUsername(string $username): void
    {
        $this->username = $username;
    }

    public function eraseCredentials(): void
    {
    }

    public function serialize(): string
    {
        return serialize([
            $this->id,
            $this->username,
            $this->password
            ]);
    }

    public function unserialize($serialized): void
    {
        [
            $this->id,
            $this->username,
            $this->password
        ] = \unserialize($serialized, ['allowed_classes' => true]);
    }

    public function __toString()
    {
        return $this->firstName.' '.$this->lastName;
    }
}
