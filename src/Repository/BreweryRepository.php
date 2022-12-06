<?php

namespace App\Repository;

use App\Entity\Brewery;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\AbstractQuery;
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

    public function findByCoordinatesAndOrderByDistance(string $location_lat, string $location_lng, int $max_distance): array
    {
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
            ->getResult(AbstractQuery::HYDRATE_ARRAY);
    }
}
