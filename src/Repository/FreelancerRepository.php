<?php

namespace App\Repository;

use App\Entity\Freelancer;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class FreelancerRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Freelancer::class);
    }

    /**
     * Find one single freelancer.
     *
     * @return mixed
     *
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findFreeLancer()
    {
        $qb = $this->createQueryBuilder('f');

        $qb->setMaxResults(1);

        return $qb->getQuery()->getOneOrNullResult();
    }
}
