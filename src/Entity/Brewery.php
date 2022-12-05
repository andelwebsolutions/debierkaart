<?php

namespace App\Entity;

use App\Repository\BreweryRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BreweryRepository::class)]
class Brewery
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $city = null;

    #[ORM\Column(length: 255)]
    private ?string $address = null;

    #[ORM\Column(length: 255)]
    private ?string $zipcode = null;

    #[ORM\Column]
    private ?float $location_lat = null;

    #[ORM\Column]
    private ?float $location_lng = null;

    #[ORM\Column(type: Types::ARRAY, nullable: true)]
    private array $open_on = [];

    #[ORM\GeneratedValue]
    private ?bool $open_today = false;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getZipcode(): ?string
    {
        return $this->zipcode;
    }

    public function setZipcode(string $zipcode): self
    {
        $this->zipcode = $zipcode;

        return $this;
    }

    public function getLocationLat(): ?float
    {
        return $this->location_lat;
    }

    public function setLocationLat(float $location_lat): self
    {
        $this->location_lat = $location_lat;

        return $this;
    }

    public function getLocationLng(): ?float
    {
        return $this->location_lng;
    }

    public function setLocationLng(float $location_lng): self
    {
        $this->location_lng = $location_lng;

        return $this;
    }

    public function getOpenOn(): array
    {
        return $this->open_on;
    }

    public function setOpenOn(?array $open_on): self
    {
        $this->open_on = $open_on;

        return $this;
    }
}
