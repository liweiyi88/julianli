<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"read"}},
 *     denormalizationContext={"groups"={"write"}},
 *     attributes={"order"={"createdAt": "DESC"}}
 * )
 *
 * @ORM\Entity(repositoryClass="App\Repository\PostRepository")
 *
 * @Vich\Uploadable
 */
class Post
{
    public const NUM_ITEMS = 5;

    /**
     * @Groups({"read"})
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"read", "write", "searchable"})
     *
     * @ORM\Column(name="title", type="string", length=255, nullable=true)
     */
    public $title;

    /**
     * @Groups({"read", "write", "searchable"})
     *
     * @ORM\Column(name="slug", type="string", length=255)
     */
    public $slug;

    /**
     * @ORM\Column(name="cover_image_url", type="string", length=255, nullable=true)
     */
    private $coverImageUrl;

    /**
     * @Vich\UploadableField(mapping="blogs", fileNameProperty="coverImageUrl")
     */
    private $coverImageFile;

    /**
     * @Groups({"read", "write", "searchable"})
     *
     * @ORM\Column(name="content", type="text")
     */
    private $content;

    /**
     * @Groups({"read", "searchable"})
     *
     * @ORM\Column(name="created_at", type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(name="page_views", type="integer", nullable=true)
     */
    private $pageViews;

    /**
     * @Groups({"read", "write", "searchable"})
     *
     * @ORM\ManyToMany(targetEntity="Tag", inversedBy="posts", cascade={"persist"})
     * @ORM\JoinTable(name="posts_tags")
     */
    public $tags;

    /**
     * @ORM\Column(name="update_at", type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @Groups({"read", "write"})
     *
     * @ORM\Column(name="is_published", type="boolean", nullable=true)
     */
    private $isPublished;

    /**
     * @Groups({"read", "write"})
     *
     * @ORM\Column(name="is_public", type="boolean", nullable=true)
     */
    private $isPublic;

    /**
     * @Groups({"read", "write"})
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Freelancer", inversedBy="posts")
     * @ORM\JoinColumn(nullable=true)
     */
    private $freelancer;

    public function __construct()
    {
        $this->tags = new ArrayCollection();
        $this->createdAt = new \DateTime();
    }

    public function pageViewCacheKey(): string
    {
        return \sprintf('post.%s.view', $this->id);
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

    public function getIsPublic(): ?bool
    {
        return $this->isPublic;
    }

    public function getIsPublished(): ?bool
    {
        return $this->isPublished;
    }

    public function getPageViews(): int
    {
        return $this->pageViews ?? 0;
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

    public function setIsPublished(bool $isPublished): void
    {
        $this->isPublished = $isPublished;
    }

    public function setIsPublic(bool $isPublic): void
    {
        $this->isPublic = $isPublic;
    }

    public function setPageViews(int $pageViews): void
    {
        $this->pageViews = $pageViews;
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
