<?php
declare(strict_types=1);

namespace App\Controller\Admin;

use App\Entity\Post;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PostController extends AbstractController
{
    /**
     * @Route("/admin/posts/create")
     */
    public function create(): Response
    {
        return $this->render('admin/post/create.html.twig');
    }

    /**
     * @Route("/admin/posts/{id}/edit")
     */
    public function edit(Post $post): Response
    {
        return $this->render('admin/post/edit.html.twig', ['post' => $post]);
    }

    /**
     * @Route("/admin/posts")
     */
    public function index(): Response
    {
        return $this->render('admin/post/list.html.twig');
    }

    /**
     * @Route("/admin/posts/{id}/show")
     */
    public function show(Post $post): Response
    {
        return $this->render('admin/post/show.html.twig', ['post' => $post]);
    }
}
