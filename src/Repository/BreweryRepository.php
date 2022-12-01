<?php

namespace App\Repository;

use App\Entity\Brewery;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Brewery>
 *
 * @method Brewery|null find($id, $lockMode = null, $lockVersion = null)
 * @method Brewery|null findOneBy(array $criteria, array $orderBy = null)
 * @method Brewery[]    findAll()
 * @method Brewery[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BreweryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Brewery::class);
    }

    public function save(Brewery $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Brewery $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function findByCoordinatesAndOrderByDistance(string $location_lat, string $location_lng, int $max_distance): array
    {
        /* @TODO: The distance is not correctly added to the entity object in the result. */
        return $this->createQueryBuilder('b')
            ->select('b')
            ->addSelect(
                '(ROUND(6371 * acos(cos( radians('.$location_lat.') ) 
                       * cos( radians( b.location_lat ) ) 
                       * cos( radians( b.location_lng ) - radians('.$location_lng.') ) 
                       + sin( radians('.$location_lat.') ) 
                       * sin( radians( b.location_lat ) )
                 ), 1)) as distance'
            )
            ->having('distance <= :max_distance')
            ->setParameter('max_distance', $max_distance)
            ->orderBy('distance', 'ASC')
            ->getQuery()
            ->getResult();
    }
}
