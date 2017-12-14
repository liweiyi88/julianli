<?php

namespace App\Controller;

use App\Repository\FreelancerRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class BlogController extends Controller
{
    /**
     * @Route("/blog/list", name="blog_list")
     */
    public function index(FreelancerRepository $freelancerRepo)
    {
        $freelancer = $freelancerRepo->findFreeLancer();
        return $this->render('blog_list.html.twig', ['freelancer' => $freelancer]);
    }
}
