<?php

namespace App\Controller;

use App\Entity\Post;
use App\Repository\PostRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PageController extends AbstractController
{
    private PostRepository $postRepository;

    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    /**
     * @Route("/", name="home")
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
        return $this->render('projects.html.twig');
    }

    /**
     * @Route("/articles", name="articles")
     */
    public function articles(): Response
    {
        $articles = $this->postRepository->findLatestPublishedPublicPosts();

        return $this->render('articles.html.twig', ['articles' => $articles]);
    }

    /**
     * @Route("/articles/{slug}", name="article_show")
     */
    public function showArticle(Post $post): Response
    {
        return $this->render('article_show.html.twig', ['article' => $post]);
    }

    /**
     * @Route("/hire-me", name="hire_me")
     */
    public function contact(): Response
    {
        return $this->render('contact.html.twig');
    }
}
