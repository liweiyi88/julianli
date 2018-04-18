<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PostRepository")
 * @Vich\Uploadable
 */
class Post
{
    public const NUM_ITEMS = 5;
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(name="title", type="string", length=255, nullable=true)
     */
    private $title;

    /**
     * @ORM\Column(name="slug", type="string", length=255)
     */
    private $slug;

    /**
     * @ORM\Column(name="cover_image_url", type="string", length=255, nullable=true)
     */
    private $coverImageUrl;

    /**
     * @Vich\UploadableField(mapping="blogs", fileNameProperty="coverImageUrl")
     */
    private $coverImageFile;

    /**
     * @ORM\Column(name="content", type="text")
     */
    private $content;

    /**
     * @ORM\Column(name="created_at", type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(name="update_at", type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\ManyToMany(targetEntity="Tag", inversedBy="posts")
     * @ORM\JoinTable(name="posts_tags")
     */
    private $tags;

    /**
     * @ORM\Column(name="is_published", type="boolean", nullable=true)
     */
    private $isPublished;

    /**
     * @ORM\Column(name="limit_visibility", type="boolean", nullable=true)
     */
    private $limitVisibility;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Freelancer", inversedBy="posts")
     * @ORM\JoinColumn(nullable=true)
     */
    private $freelancer;

    public function __construct()
    {
        $this->tags = new ArrayCollection();
        $this->createdAt = new \DateTime();
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function getCoverImageFile(): ?File
    {
        return $this->coverImageFile;
    }

    public function getCoverImageUrl(): ?string
    {
        return $this->coverImageUrl;
    }

    public function getCreatedAt(): ?\DateTime
    {
        return $this->createdAt;
    }

    public function getFreelancer(): ?Freelancer
    {
        return $this->freelancer;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIsPublished(): ?bool
    {
        return $this->isPublished;
    }

    public function getLimitVisibility(): ?bool
    {
        return $this->limitVisibility;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function getUpdatedAt(): ?\DateTime
    {
        return $this->updatedAt;
    }

    public function setContent(string $content): void
    {
        $this->content = $content;
    }

    public function setCoverImageFile(File $image = null): void
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

    public function setCreatedAt(?\DateTime $createdAt): void
    {
        $this->createdAt = $createdAt;
    }

    public function setFreelancer(Freelancer $freelancer): void
    {
        $this->freelancer = $freelancer;
    }

    public function setId(int $id): void
    {
        $this->id = $id;
    }

    public function setIsPublished($isPublished): void
    {
        $this->isPublished = $isPublished;
    }

    public function setLimitVisibility(?bool $limitVisibility): void
    {
        $this->limitVisibility = $limitVisibility;
    }

    public function setSlug(?string $slug): void
    {
        $this->slug = $slug;
    }

    public function setTags(?array $tags): void
    {
        $this->tags = $tags;
    }

    public function setTitle(?string $title): void
    {
        $this->title = $title;
    }

    public function setUpdatedAt(?\DateTime $updatedAt): void
    {
        $this->updatedAt = $updatedAt;
    }

    public function __toString(): ?string
    {
        return $this->title;
    }
}
