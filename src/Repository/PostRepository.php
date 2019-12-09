<?php

namespace App\Repository;

use App\Entity\Post;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

final class PostRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Post::class);
    }

    /**
     * @return array<int, Post>
     */
    public function findLatestPublishedPublicPosts(): array
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
        return $query->getResult();
    }

    /**
     * @return array<int, Post>
     *
     * @throws \Exception
     */
    public function findUpdatedAtToday(): array
    {
        $qb = $this->createQueryBuilder('p');
        $qb->where('p.createdAt between :start_at and :end_at');
        $qb->setParameter('start_at', (new \DateTime('now'))->setTime(0, 0));
        $qb->setParameter('end_at', (new \DateTime('now'))->setTime(23, 59, 59));

        return $qb->getQuery()->getResult();
    }
}
