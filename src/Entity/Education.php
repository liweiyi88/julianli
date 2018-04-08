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
     * @ORM\Column(name="date_range", type="string", length=255)
     */
    private $dateRange;

    /**
     * @ORM\Column(name="degree", type="string", length=255)
     */
    private $degree;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Freelancer", inversedBy="education")
     * @ORM\JoinColumn(nullable=true)
     */
    private $freelancer;

    /**
     * @ORM\Column(name="university", type="string", length=255)
     */
    private $university;

    /**
     * @return null|string
     */
    public function getDateRange(): ?string
    {
        return $this->dateRange;
    }

    /**
     * @return null|string
     */
    public function getDegree(): ?string
    {
        return $this->degree;
    }

    /**
     * @return Freelancer|null
     */
    public function getFreelancer(): ?Freelancer
    {
        return $this->freelancer;
    }

    /**
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return null|string
     */
    public function getUniversity(): ?string
    {
        return $this->university;
    }

    /**
     * @param null|string $dateRange
     */
    public function setDateRange(?string $dateRange): void
    {
        $this->dateRange = $dateRange;
    }

    /**
     * @param null|string $degree
     */
    public function setDegree(?string $degree): void
    {
        $this->degree = $degree;
    }

    /**
     * @param Freelancer $freelancer
     */
    public function setFreelancer(Freelancer $freelancer): void
    {
        $this->freelancer = $freelancer;
    }

    /**
     * @param null|string $university
     */
    public function setUniversity(?string $university): void
    {
        $this->university = $university;
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return $this->degree.' at '.$this->university;
    }
}
