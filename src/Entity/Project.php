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
     * @ORM\Column(name="description", type="text")
     */
    private $description;

    /**
     * @ORM\Column(name="cover_image_style_size", type="integer")
     */
    private $coverImageStyleSize;

    /**
     * @ORM\Column(name="cover_image_url", type="string", length=255)
     */
    private $coverImageUrl;


    /**
     * @ORM\Column(name="inner_image_url", type="string", length=255)
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

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id): void
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     */
    public function setTitle($title): void
    {
        $this->title = $title;
    }

    /**
     * @return mixed
     */
    public function getTag()
    {
        return $this->tag;
    }

    /**
     * @param mixed $tag
     */
    public function setTag($tag): void
    {
        $this->tag = $tag;
    }

    /**
     * @return mixed
     */
    public function getShortDescription()
    {
        return $this->shortDescription;
    }

    /**
     * @param mixed $shortDescription
     */
    public function setShortDescription($shortDescription): void
    {
        $this->shortDescription = $shortDescription;
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param mixed $description
     */
    public function setDescription($description): void
    {
        $this->description = $description;
    }

    /**
     * @return mixed
     */
    public function getCoverImageStyleSize()
    {
        return $this->coverImageStyleSize;
    }

    /**
     * @param mixed $coverImageStyleSize
     */
    public function setCoverImageStyleSize($coverImageStyleSize): void
    {
        $this->coverImageStyleSize = $coverImageStyleSize;
    }

    /**
     * @return mixed
     */
    public function getCoverImageUrl()
    {
        return $this->coverImageUrl;
    }

    /**
     * @param mixed $coverImageUrl
     */
    public function setCoverImageUrl($coverImageUrl): void
    {
        $this->coverImageUrl = $coverImageUrl;
    }

    /**
     * @return mixed
     */
    public function getInnerImageUrl()
    {
        return $this->innerImageUrl;
    }

    /**
     * @param mixed $innerImageUrl
     */
    public function setInnerImageUrl($innerImageUrl): void
    {
        $this->innerImageUrl = $innerImageUrl;
    }

    /**
     * @return mixed
     */
    public function getLink()
    {
        return $this->link;
    }

    /**
     * @param mixed $link
     */
    public function setLink($link): void
    {
        $this->link = $link;
    }

    /**
     * @return mixed
     */
    public function getFreelancer(): ?Freelancer
    {
        return $this->freelancer;
    }

    /**
     * @param mixed $freelancer
     */
    public function setFreelancer($freelancer): void
    {
        $this->freelancer = $freelancer;
    }
}
