<?php

namespace App\Command;

use App\Entity\Brewery;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:seed-breweries',
    description: 'Seed the database ',
)]
class SeedBreweriesCommand extends Command
{
    public function __construct(
        private EntityManagerInterface $em
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $this->truncateBreweries();

        $io = new SymfonyStyle($input, $output);

        $breweries = json_decode(file_get_contents('public/breweries.json'))->breweries;

        foreach ($breweries as $brewery) {
            $entity = new Brewery();
            $entity->setName($brewery->name);
            $entity->setZipcode($brewery->zipcode);
            $entity->setAddress($brewery->address);
            $entity->setCity($brewery->city);
            $entity->setLocationLat($brewery->location->lat);
            $entity->setLocationLng($brewery->location->lng);
            $entity->setOpenOn($brewery->open);

            $this->em->persist($entity);
            $this->em->flush();
        }

        $io->success('Successfully seeded the database with '.$this->breweriesCount().' breweries!');

        return Command::SUCCESS;
    }

    protected function truncateBreweries(): void
    {
        $conn = $this->em->getConnection();

        $sql = "TRUNCATE TABLE brewery";
        $stmt = $conn->prepare($sql);

        $stmt->executeStatement();
    }

    protected function breweriesCount(): int
    {
        return $this->em->getRepository(Brewery::class)
            ->createQueryBuilder('b')
            ->select('count(b.id)')
            ->getQuery()
            ->getSingleScalarResult();
    }
}
