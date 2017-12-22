<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ExperienceRepository")
 */
class Experience
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
     * @ORM\Column(name="company", type="string", length=255)
     */
    private $company;

    /**
     * @ORM\Column(name="job_title", type="string", length=255)
     */
    private $jobTitle;

    /**
     * @ORM\Column(name="description", type="text")
     */
    private $description;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Freelancer", inversedBy="experiences")
     * @ORM\JoinColumn(nullable=true)
     */
    private $freelancer;

    public function getId(): int
    {
        return $this->id;
    }

    public function getDateRange(): ?string
    {
        return $this->dateRange;
    }

    public function setDateRange(?string $dateRange): void
    {
        $this->dateRange = $dateRange;
    }

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(?string $company): void
    {
        $this->company = $company;
    }

    public function getJobTitle(): ?string
    {
        return $this->jobTitle;
    }

    public function setJobTitle(?string $jobTitle): void
    {
        $this->jobTitle = $jobTitle;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
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
        return $this->jobTitle.' at '.$this->company;
    }
}
