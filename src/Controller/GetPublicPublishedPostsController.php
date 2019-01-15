<?php

namespace App\Controller;

use App\Repository\PostRepository;

class GetPublicPublishedPostsController
{
    private $postRepository;

    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public function __invoke()
    {
        return $this->postRepository->findLatestPublishedPublicPosts();
    }
}
