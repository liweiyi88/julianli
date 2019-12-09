<?php

namespace App\Controller;

use App\Entity\Post;
use App\Repository\PostRepository;

class GetPublicPublishedPostsController
{
    private PostRepository $postRepository;

    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    /**
     * @return Post[]
     */
    public function __invoke(): array
    {
        return $this->postRepository->findLatestPublishedPublicPosts();
    }
}
