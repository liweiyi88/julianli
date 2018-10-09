<?php

namespace App\Controller;

use App\Repository\FreelancerRepository;
use App\Repository\PostRepository;
use App\Service\Cache\Cache;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\SerializerInterface;

class BaseController extends AbstractController
{
    /**
     * @var \App\Service\Cache\Cache
     */
    protected $cache;

    /**
     * @var \App\Repository\FreelancerRepository
     */
    protected $freelancerRepository;

    /**
     * @var \App\Repository\PostRepository
     */
    protected $postRepository;

    /**
     * @var \Symfony\Component\Serializer\SerializerInterface
     */
    protected $serializer;

    public function __construct(
        Cache $cache,
        FreelancerRepository $freelancerRepository,
        PostRepository $postRepository,
        SerializerInterface $serializer
    ) {
        $this->cache = $cache;
        $this->freelancerRepository = $freelancerRepository;
        $this->postRepository = $postRepository;
        $this->serializer = $serializer;
    }

    protected function attachPageViews(iterable $posts): void
    {
        /** @var \App\Entity\Post $post */
        foreach ($posts as $post) {
            $pageViews = $this->cache->get($post->pageViewCacheKey(), $post->getPageViews());
            $post->setPageViews($pageViews);
        }
    }
}
