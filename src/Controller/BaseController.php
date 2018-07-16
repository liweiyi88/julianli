<?php

namespace App\Controller;

use App\Service\Cache\Cache;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

class BaseController extends AbstractController
{
    /**
     * @var \App\Service\Cache\Cache
     */
    protected $cache;

    /**
     * @var \Symfony\Component\Serializer\SerializerInterface
     */
    protected $serializer;

    public function __construct(Cache $cache, SerializerInterface $serializer)
    {
        $this->cache = $cache;
        $this->serializer = $serializer;
    }

    /**
     * @param object $data
     * @param int  $statusCode
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \InvalidArgumentException
     */
    protected function createApiResponse($data, int $statusCode = 200): Response
    {
        $json = $this->serialize($data);

        return new Response(
            $json,
            $statusCode,
            ['Content-Type' => 'application/json']
        );
    }

    /**
     * @param object $data
     * @param string $format
     *
     * @return string
     */
    protected function serialize($data, string $format = 'json'): string
    {
        return $this->serializer->serialize($data, $format);
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
