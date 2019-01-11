<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProfileController extends BaseController
{
    /**
     * @Route("/", name="home")
     */
    public function index(): Response
    {
        $latestPosts = $this->postRepository->findLatestPublishedPublicPosts();

        $this->attachPageViews($latestPosts);

        return $this->render(
            'profile.html.twig',
            [
                'freelancer' => $this->freelancerRepository->findFreeLancer(),
                'posts' => $latestPosts
            ]
        );
    }

    /**
     * @Route("/preview", name="new_home")
     */
    public function preview(): Response
    {
        return $this->render('home.html.twig');
    }
}
