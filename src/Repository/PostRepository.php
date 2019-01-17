<?php

namespace App\Repository;

use App\Entity\Post;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

final class PostRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Post::class);
    }

    public function findLatestPublishedPublicPosts()
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

    public function findUpdatedAtToday(): ?array
    {
        $qb = $this->createQueryBuilder('p');
        $qb->where('p.createdAt between :start_at and :end_at');
        $qb->setParameter('start_at', (new \DateTime('now'))->setTime(0, 0));
        $qb->setParameter('end_at', (new \DateTime('now'))->setTime(23, 59, 59));

        return $qb->getQuery()->getResult();
    }
}
