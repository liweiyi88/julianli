<?php

namespace App\Controller;

use App\Repository\PostRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ArticlesController extends AbstractController
{
    private $postRepository;

    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    /**
     * @Route("/articles", name="articles")
     */
    public function index(): Response
    {
        return $this->render('articles/index.html.twig', [
            'articles' => $this->postRepository->findLatestPublishedPublicPosts(),
        ]);
    }
}
