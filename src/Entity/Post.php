<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Controller\GetPublicPublishedPostsController;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(
 *     collectionOperations={
 *         "post",
 *         "get",
 *         "get_public_published" = {
 *           "method"="GET",
 *           "path"="/public-published-posts",
 *           "controller"=GetPublicPublishedPostsController::class,
 *           "defaults"={"_api_receive"=false},
 *          }
 *     },
 *     normalizationContext={"groups"={"read"}},
 *     denormalizationContext={"groups"={"write"}},
 *     attributes={"order"={"createdAt": "DESC"}}
 * )
 *
 * @ORM\Entity(repositoryClass="App\Repository\PostRepository")
 */
class Post
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
     * @Groups({"read", "write", "searchable"})
     *
     * @ORM\Column(name="title", type="string", length=255, nullable=true)
     */
    public string $title;

    /**
     * @Groups({"read", "write", "searchable"})
     *
     * @ORM\Column(name="slug", type="string", length=255)
     */
    public string $slug;

    /**
     * @Groups({"read", "write", "searchable"})
     *
     * @ORM\Column(name="content", type="text")
     */
    private string $content;

    /**
     * @Groups({"read", "searchable"})
     *
     * @ORM\Column(name="created_at", type="datetime")
     */
    private \DateTime $createdAt;

    /**
     * @Groups({"read", "write", "searchable"})
     *
     * @ORM\ManyToMany(targetEntity="Tag", inversedBy="posts", cascade={"persist"})
     * @ORM\JoinTable(name="posts_tags")
     */
    private $tags;

    /**
     * @ORM\Column(name="update_at", type="datetime", nullable=true)
     */
    private ?\DateTime $updatedAt = null;

    /**
     * @Groups({"read", "write"})
     *
     * @ORM\Column(name="is_published", type="boolean", nullable=true)
     */
    private ?bool $isPublished;

    /**
     * @Groups({"read", "write"})
     *
     * @ORM\Column(name="is_public", type="boolean", nullable=true)
     */
    private ?bool $isPublic;

    /**
     * @Groups({"read", "write"})
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Freelancer", inversedBy="posts")
     * @ORM\JoinColumn(nullable=true)
     */
    private ?Freelancer $freelancer = null;

    public function __construct()
    {
        $this->tags = new ArrayCollection();
        $this->createdAt = new \DateTime();
    }

    public function getContent(): ?string
    {
        return $this->content;
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

    public function getUpdatedAt(): ?\DateTime
    {
        return $this->updatedAt;
    }

    public function setContent(string $content): void
    {
        $this->content = $content;
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

    public function setUpdatedAt(?\DateTime $updatedAt): void
    {
        $this->updatedAt = $updatedAt;
    }

    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function setTags($tags): void
    {
        $this->tags = $tags;
    }

    public function getShortDescription(): string
    {
        $output = \explode(' ',$this->content);

        if (\count($output) > 30) {
            return \implode(' ',\array_slice($output, 0 , 30)) . '...';
        }

        return $this->content;
    }

    public function __toString(): ?string
    {
        return $this->title;
    }
}
