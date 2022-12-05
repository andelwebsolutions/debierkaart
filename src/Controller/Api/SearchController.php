<?php

namespace App\Controller\Api;

use App\Exception\InvalidZipcode;
use App\Factory\JsonResponseFactory;
use App\Repository\BreweryRepository;
use App\Request\SearchRequest;
use App\Service\GeocodeService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SearchController extends AbstractController
{
    public function __construct(
        private JsonResponseFactory $jsonResponseFactory,
        private SearchRequest $request,
        private GeocodeService $geocodeService
    ) {}

    #[Route('/api/search', name: 'app_api_search')]
    public function index(BreweryRepository $breweriesRepository, Request $searchRequest): Response
    {
        $errors = $this->request->validate();

        if (count($errors) != 0) {
            $response = new JsonResponse($errors, 422);
            $response->send();

            exit;
        }
//
//        try {
//            $coordinates = $this->geocodeService
//                ->zipcode($searchRequest->query->get('zipcode'))
//                ->getCoordinates();
//        } catch (InvalidZipcode $exception) {
//            $response = new JsonResponse([
//                'zipcode' => 'Vul een geldige postcode in.'
//            ], 422);
//            $response->send();
//
//            exit;
//        }

        $coordinates = [
            'lat' => 52.364722,
            'lng' => 4.929389
        ];

        $breweries = $breweriesRepository->findByCoordinatesAndOrderByDistance(
            $coordinates['lat'],
            $coordinates['lng'],
            $searchRequest->query->get('max_distance')
        );

        $breweries = array_map(fn ($brewery) =>
            array_merge($brewery[0], ['distance' => $brewery['distance']])
        , $breweries);

        return $this->jsonResponseFactory->create(
            [
                'data' => $breweries,
                'query' => [
                    'zipcode' => $searchRequest->query->get('zipcode'),
                    'max_distance' => $searchRequest->query->get('max_distance'),
                ]
            ]
        );
    }
}
