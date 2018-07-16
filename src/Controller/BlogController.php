<?php

namespace App\Controller;

use App\Entity\Post;
use App\Repository\FreelancerRepository;
use App\Repository\PostRepository;
use App\Service\Cache\Cache;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Annotation\Route;

class BlogController extends BaseController
{
    /**
     * @var \App\Repository\FreelancerRepository
     */
    private $freelancerRepository;

    /**
     * @var \App\Repository\PostRepository
     */
    private $postRepository;

    public function __construct(
        Cache $cache,
        SerializerInterface $serializer,
        FreelancerRepository $freelancerRepository,
        PostRepository $postRepository
    ) {
        parent::__construct($cache, $serializer);

        $this->freelancerRepository = $freelancerRepository;
        $this->postRepository = $postRepository;
    }

    /**
     * @Route("/blog/list", defaults={"page": "1"}, name="blog_list")
     * @Route("/blog/list/{page}", requirements={"page": "[1-9]\d*"}, name="blog_list_paginated")
     */
    public function index(int $page): Response
    {
        if ($this->isGranted('ROLE_USER')) {
            $posts = $this->postRepository->findLatestPublishedPosts($page);
        } else {
            $posts = $this->postRepository->findLatestPublishedPublicPosts($page);
        }

        $freelancer = $this->freelancerRepository->findFreeLancer();
        return $this->render('blog/blog_list.html.twig', ['posts' => $posts, 'freelancer' => $freelancer]);
    }

    /**
     * @Route("/posts/{slug}", name="blog_post", methods={"GET"})
     */
    public function postShow(Post $post): Response
    {
        $freelancer = $this->freelancerRepository->findFreeLancer();

        $latestPosts = $this->postRepository->findLatestPublishedPublicPosts();

        $this->attachPageViews($latestPosts);

        if (!$post->isPublic()) {
            $this->denyAccessUnlessGranted('ROLE_USER', null, 'Please login to get the access to the post');
        }

        $this->cache->increment($post->pageViewCacheKey());

        return $this->render('blog/post_show.html.twig', [
            'post' => $post,
            'freelancer' => $freelancer,
            'posts' => $latestPosts
        ]);
    }
}
