<?php

namespace App\Repository;

use App\Entity\Post;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query;
use Pagerfanta\Adapter\DoctrineORMAdapter;
use Pagerfanta\Pagerfanta;
use Symfony\Bridge\Doctrine\RegistryInterface;

class PostRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Post::class);
    }

    /**
     * @param int $page
     *
     * @return Pagerfanta
     *
     * @throws \Pagerfanta\Exception\LessThan1CurrentPageException
     * @throws \Pagerfanta\Exception\LessThan1MaxPerPageException
     * @throws \Pagerfanta\Exception\NotIntegerCurrentPageException
     * @throws \Pagerfanta\Exception\NotIntegerMaxPerPageException
     * @throws \Pagerfanta\Exception\OutOfRangeCurrentPageException
     */
    public function findLatestPublishedPublicPosts($page = 1): Pagerfanta
    {
        $query = $this->getEntityManager()
            ->createQuery(
                '
                SELECT p, f, t
                FROM App:POST p
                JOIN p.freelancer f
                LEFT JOIN p.tags t
                WHERE p.isPublished = TRUE AND p.isPublic = TRUE
                ORDER BY p.id DESC
                '
            );
        return $this->createPaginator($query, $page);
    }

    /**
     * @param Query $query
     * @param int $page
     *
     * @return \Pagerfanta\Pagerfanta
     *
     * @throws \Pagerfanta\Exception\LessThan1CurrentPageException
     * @throws \Pagerfanta\Exception\LessThan1MaxPerPageException
     * @throws \Pagerfanta\Exception\NotIntegerCurrentPageException
     * @throws \Pagerfanta\Exception\NotIntegerMaxPerPageException
     * @throws \Pagerfanta\Exception\OutOfRangeCurrentPageException
     */
    public function createPaginator(Query $query, int $page): Pagerfanta
    {
        $paginator = new Pagerfanta(new DoctrineORMAdapter($query));
        $paginator->setMaxPerPage(Post::NUM_ITEMS);
        $paginator->setCurrentPage($page);

        return $paginator;
    }
}
