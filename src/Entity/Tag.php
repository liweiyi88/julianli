<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"read"}},
 *     denormalizationContext={"groups"={"write"}}
 * )
 *
 * @ORM\Entity(repositoryClass="App\Repository\TagRepository")
 */
class Tag
{
    /**
     * @Groups({"read"})
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @Groups({"read", "write"})
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    public string $name;

    /**
     * @var Collection<int, Post>
     *
     * @ORM\ManyToMany(targetEntity="Post", mappedBy="tags")
     */
    public Collection $posts;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function __construct()
    {
        $this->posts = new ArrayCollection();
    }
}
