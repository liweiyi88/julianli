<?php

namespace App\Controller;

use App\Repository\FreelancerRepository;
use App\Repository\PostRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class BlogController extends Controller
{
    /**
     * @Route("/blog/list", defaults={"page": "1"}, name="blog_list")
     * @Route("/blog/list/{page}", requirements={"page": "[1-9]\d*"}, name="blog_list_paginated")
     */
    public function index(int $page, PostRepository $postRepository, FreelancerRepository $freelancerRepository)
    {
        $posts = $postRepository->findLatest($page);
        $freelancer = $freelancerRepository->findFreeLancer();
        return $this->render('blog_list.html.twig', ['posts' => $posts, 'freelancer' => $freelancer]);
    }
}
