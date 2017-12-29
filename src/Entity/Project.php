<?php

namespace App\Entity;

use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProjectRepository")
 * @Vich\Uploadable
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
     * @Vich\UploadableField(mapping="projects", fileNameProperty="coverImageUrl")
     * @var File
     */
    private $coverImageFile;


    /**
     * @ORM\Column(name="inner_image_url", type="string", length=255, nullable=true)
     */
    private $innerImageUrl;

    /**
     * @Vich\UploadableField(mapping="projects", fileNameProperty="innerImageUrl")
     * @var File
     */
    private $innerImageFile;

    /**
     * @ORM\Column(name="link", type="string", length=255, nullable=true)
     */
    private $link;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Freelancer", inversedBy="projects")
     * @ORM\JoinColumn(nullable=true)
     */
    private $freelancer;

    /**
     * @ORM\Column(name="update_at", type="datetime", nullable=true)
     * @var \DateTime
     */
    private $updatedAt;

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

    public function getCoverImageFile(): ?File
    {
        return $this->coverImageFile;
    }

    public function setCoverImageFile(File $image = null)
    {
        $this->coverImageFile = $image;

        // VERY IMPORTANT:
        // It is required that at least one field changes if you are using Doctrine,
        // otherwise the event listeners won't be called and the file is lost
        if ($image) {
            // if 'updatedAt' is not defined in your entity, use another property
            $this->updatedAt = new \DateTime('now');
        }
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

    /**
     * @return File
     */
    public function getInnerImageFile(): ?File
    {
        return $this->innerImageFile;
    }

    /**
     * @param File $innerImageFile
     */
    public function setInnerImageFile(File $innerImageFile = null): void
    {
        $this->innerImageFile = $innerImageFile;

        // VERY IMPORTANT:
        // It is required that at least one field changes if you are using Doctrine,
        // otherwise the event listeners won't be called and the file is lost
        if ($innerImageFile) {
            // if 'updatedAt' is not defined in your entity, use another property
            $this->updatedAt = new \DateTime('now');
        }
    }

    public function getLink(): ?string
    {
        return $this->link;
    }

    public function setLink(?string $link): void
    {
        $this->link = $link;
    }

    /**
     * @return \DateTime
     */
    public function getUpdatedAt(): \DateTime
    {
        return $this->updatedAt;
    }

    /**
     * @param \DateTime $updatedAt
     */
    public function setUpdatedAt(\DateTime $updatedAt): void
    {
        $this->updatedAt = $updatedAt;
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
        return $this->title;
    }
}
