<?php

namespace App\Controller;

use App\Entity\Post;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class BlogController extends BaseController
{
    /**
     * @Route("/blog/list", defaults={"page": "1"}, name="blog_list")
     * @Route("/blog/list/{page}", requirements={"page": "[1-9]\d*"}, name="blog_list_paginated")
     */
    public function index(int $page): Response
    {
        $posts = $this->isGranted('ROLE_USER') ?
            $this->postRepository->findLatestPublishedPosts($page) :
            $this->postRepository->findLatestPublishedPublicPosts($page);

        return $this->render('blog/blog_list.html.twig', [
            'posts' => $posts,
            'freelancer' => $this->freelancerRepository->findFreeLancer()
        ]);
    }

    /**
     * @Route("/posts/{slug}", name="blog_post", methods={"GET"})
     */
    public function postShow(Post $post): Response
    {
        if (!$post->isPublic()) {
            $this->denyAccessUnlessGranted('ROLE_USER', null, 'Please login to get the access to the post');
        }

        $latestPosts = $this->postRepository->findLatestPublishedPublicPosts();

        $this->attachPageViews($latestPosts);

        $this->cache->increment($post->pageViewCacheKey());

        return $this->render('blog/post_show.html.twig', [
            'post' => $post,
            'freelancer' => $this->freelancerRepository->findFreeLancer(),
            'posts' => $latestPosts
        ]);
    }
}
