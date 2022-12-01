<?php

namespace App\Controller\Api;

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
        private JsonResponseFactory $jsonResponseFactory
    ) {}

    #[Route('/api/search', name: 'app_api_search')]
    public function index(BreweryRepository $breweriesRepository, Request $searchRequest): Response
    {
        $breweries = $breweriesRepository->findByZipcode(
            $searchRequest->query->get('zipcode')
        );

        return $this->jsonResponseFactory->create(
            [
                'data' => $breweries
            ]
        );
    }
}
