<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProjectRepository")
 */
class Project
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(name="title", type="string", length=255)
     */
    private $title;

    /**
     * @ORM\Column(name="tag", type="string", length=65)
     */
    private $tag;

    /**
     * @ORM\Column(name="short_description", type="string", length=255)
     */
    private $shortDescription;

    /**
     * @ORM\Column(name="description", type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(name="cover_image_style_size", type="integer", nullable=true)
     */
    private $coverImageStyleSize;

    /**
     * @ORM\Column(name="cover_image_url", type="string", length=255, nullable=true)
     */
    private $coverImageUrl;


    /**
     * @ORM\Column(name="inner_image_url", type="string", length=255, nullable=true)
     */
    private $innerImageUrl;

    /**
     * @ORM\Column(name="link", type="string", length=255, nullable=true)
     */
    private $link;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Freelancer", inversedBy="projects")
     * @ORM\JoinColumn(nullable=true)
     */
    private $freelancer;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): void
    {
        $this->id = $id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): void
    {
        $this->title = $title;
    }

    public function getTag(): ?string
    {
        return $this->tag;
    }

    public function setTag(?string $tag): void
    {
        $this->tag = $tag;
    }

    public function getShortDescription(): ?string
    {
        return $this->shortDescription;
    }

    public function setShortDescription(?string $shortDescription): void
    {
        $this->shortDescription = $shortDescription;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    public function getCoverImageStyleSize(): ?int
    {
        return $this->coverImageStyleSize;
    }

    public function setCoverImageStyleSize(?int $coverImageStyleSize): void
    {
        $this->coverImageStyleSize = $coverImageStyleSize;
    }

    public function getCoverImageUrl(): ?string
    {
        return $this->coverImageUrl;
    }

    public function setCoverImageUrl(?string $coverImageUrl): void
    {
        $this->coverImageUrl = $coverImageUrl;
    }

    public function getInnerImageUrl(): ?string
    {
        return $this->innerImageUrl;
    }

    public function setInnerImageUrl(?string $innerImageUrl): void
    {
        $this->innerImageUrl = $innerImageUrl;
    }

    public function getLink(): ?string
    {
        return $this->link;
    }

    public function setLink(?string $link): void
    {
        $this->link = $link;
    }

    public function getFreelancer(): Freelancer
    {
        return $this->freelancer;
    }

    public function setFreelancer(Freelancer $freelancer): void
    {
        $this->freelancer = $freelancer;
    }

    public function __toString()
    {
        return $this->title;
    }
}
