<?php

namespace App\Service;

use App\Exception\InvalidZipcode;
use App\Exception\NoCoordinatesForValidZipcode;
use Symfony\Component\HttpClient\Exception\TransportException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use function Symfony\Component\DependencyInjection\Loader\Configurator\env;

class GeocodeService
{
    private string $zipcode;

    public function __construct(
        private HttpClientInterface $client
    ) {}

    public function zipcode(string $zipcode): self
    {
        $this->zipcode = $zipcode;

        return $this;
    }

    public function getCoordinates(): ?array
    {
        $api_key = $_ENV['GOOGLE_API_KEY'];

        $url = 'https://maps.googleapis.com/maps/api/geocode/json?address='.$this->zipcode.'&key='.$api_key;

        $response = $this->client->request('GET', $url);

        $content = $response->toArray();

        if (count($content['results']) == 0) {
            throw new InvalidZipcode;
        };

        return $content['results'][0]['geometry']['location'];
    }
}