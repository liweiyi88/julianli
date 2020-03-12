<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PageController extends AbstractController
{
    /**
     * @Route("/", name="home")
     * @Route("/articles", name="articles")
     * @Route("/article/using-symfony-messenger-with-aws-sqs", name="article_using_symfony_messenger_with_aws_sqs")
     * @Route("/article/keep-learning-in-2018", name="article_keep_learning_in_2018")
     * @Route("/hire-me", name="hire_me")
     */
    public function index(): Response
    {
        return $this->render('home.html.twig');
    }

    /**
     * @Route("/projects", name="projects")
     */
    public function projects(): Response
    {
        return $this->render('project.html.twig');
    }
}
