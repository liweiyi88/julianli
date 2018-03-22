<?php

namespace App\Controller;

use App\Entity\Post;
use App\Repository\FreelancerRepository;
use App\Repository\PostRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class BlogController extends Controller
{
    /**
     * @Route("/blog/list", defaults={"page": "1"}, name="blog_list")
     * @Route("/blog/list/{page}", requirements={"page": "[1-9]\d*"}, name="blog_list_paginated")
     */
    public function index(int $page, PostRepository $postRepository, FreelancerRepository $freelancerRepository)
    {
        $posts = $postRepository->findLatestPublished($page);
        $freelancer = $freelancerRepository->findFreeLancer();
        return $this->render('blog/blog_list.html.twig', ['posts' => $posts, 'freelancer' => $freelancer]);
    }

    /**
     * @Route("/posts/{slug}", name="blog_post")
     * @Method("GET")
     */
    public function postShow(Post $post, FreelancerRepository $freelancerRepository): Response
    {
        $freelancer = $freelancerRepository->findFreeLancer();
        return $this->render('blog/post_show.html.twig', ['post' => $post, 'freelancer' => $freelancer]);
    }
}
