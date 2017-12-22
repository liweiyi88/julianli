<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EducationRepository")
 */
class Education
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(name="degree", type="string", length=255)
     */
    private $degree;

    /**
     * @ORM\Column(name="date_range", type="string", length=255)
     */
    private $dateRange;

    /**
     * @ORM\Column(name="university", type="string", length=255)
     */
    private $university;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Freelancer", inversedBy="education")
     * @ORM\JoinColumn(nullable=true)
     */
    private $freelancer;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDegree(): ?string
    {
        return $this->degree;
    }

    public function setDegree(?string $degree): void
    {
        $this->degree = $degree;
    }

    public function getDateRange(): ?string
    {
        return $this->dateRange;
    }

    public function setDateRange(?string $dateRange): void
    {
        $this->dateRange = $dateRange;
    }

    public function getUniversity(): ?string
    {
        return $this->university;
    }

    public function setUniversity(?string $university): void
    {
        $this->university = $university;
    }

    public function getFreelancer(): ?Freelancer
    {
        return $this->freelancer;
    }

    public function setFreelancer(Freelancer $freelancer): void
    {
        $this->freelancer = $freelancer;
    }

    public function __toString()
    {
        return $this->degree.' at '.$this->university;
    }
}
