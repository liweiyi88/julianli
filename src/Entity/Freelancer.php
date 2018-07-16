<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Table(name="freelancer")
 * @ORM\Entity(repositoryClass="App\Repository\FreelancerRepository")
 */
class Freelancer implements UserInterface, \Serializable
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(name="email", type="string", length=255)
     */
    private $email;

    /**
     * @ORM\Column(name="username", type="string", length=25, unique=true)
     */
    private $username;

    /**
     * @ORM\Column(name="password", type="string", length=64)
     */
    private $password;

    /**
     * @ORM\Column(name="first_name", type="string", length=255)
     */
    private $firstName;

    /**
     * @ORM\Column(name="last_name", type="string", length=255)
     */
    private $lastName;

    /**
     * @ORM\Column(name="address", type="string", length=255, nullable=true)
     */
    private $address;

    /**
     * @ORM\Column(name="title", type="string", length=255)
     */
    private $title;

    /**
     * @ORM\Column(name="description", type="text")
     */
    private $description;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\SocialNetwork", mappedBy="freelancer")
     */
    private $socialNetworks;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Skill", mappedBy="freelancer")
     */
    private $skills;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Experience", mappedBy="freelancer")
     */
    private $experiences;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Education", mappedBy="freelancer")
     */
    private $education;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Project", mappedBy="freelancer")
     */
    private $projects;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Post", mappedBy="freelancer")
     */
    private $posts;

    public function __construct()
    {
        $this->socialNetworks = new ArrayCollection();
        $this->skills = new ArrayCollection();
        $this->experiences = new ArrayCollection();
        $this->education = new ArrayCollection();
        $this->projects = new ArrayCollection();
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

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): void
    {
        $this->address = $address;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): void
    {
        $this->title = $title;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    public function getSocialNetworks(): Collection
    {
        return $this->socialNetworks;
    }

    public function setSocialNetworks(Collection $socialNetworks): void
    {
        $this->socialNetworks = $socialNetworks;
    }

    public function getSkills(): Collection
    {
        return $this->skills;
    }

    public function setSkills(Collection $skills): void
    {
        $this->skills = $skills;
    }

    public function getExperiences(): Collection
    {
        return $this->experiences;
    }

    public function setExperiences(Collection $experiences): void
    {
        $this->experiences = $experiences;
    }

    public function getEducation(): Collection
    {
        return $this->education;
    }

    public function setEducation(Education $education): void
    {
        $this->education = $education;
    }

    public function getProjects(): Collection
    {
        return $this->projects;
    }

    public function getPosts(): Collection
    {
        return $this->posts;
    }

    public function setPosts(Collection $posts): void
    {
        $this->posts = $posts;
    }

    public function setProjects(Collection $projects): void
    {
        $this->projects = $projects;
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

    public function getSalt(): void
    {
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
