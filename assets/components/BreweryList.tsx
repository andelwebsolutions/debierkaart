import React, { FC } from 'react';
import { Stack, Text, Alert, AlertIcon, AlertTitle, AlertDescription, Center, Spinner, Heading, Image } from "@chakra-ui/react";
import Brewery from "./Brewery";
import BreweryInterface from "../interfaces/brewery";
import QueryInterface from "../interfaces/query";

interface BreweryListProps {
    breweries: {
        data: BreweryInterface [];
        distance: number;
        query: QueryInterface;
    };
    isLoading: boolean;
}

const BreweryList: FC = ({ breweries, isLoading }: BreweryListProps) => {
    return (
        <>
            { breweries && breweries.data && ! breweries.data.length ?
                <Alert borderRadius="4" status="warning">
                    <AlertIcon />
                    <AlertTitle>Ah oh!</AlertTitle>
                    <AlertDescription>We konden geen brouwerijen vinden binnen een straal van {breweries.query.max_distance}km van {breweries.query.zipcode}.</AlertDescription>
                </Alert> : null }

            { breweries && breweries.data && breweries.data.length ?
                <>
                    <Text color="gray.600" fontSize="lg"><strong>{ breweries.data.length } brouwerij{breweries.data.length > 1 ? 'en' : ''}</strong> gevonden in een straal van <strong>{ breweries.query.max_distance }km</strong> vanaf <strong>{ breweries.query.zipcode }</strong>.</Text>
                    <Stack mt="4" spacing="3">
                        { breweries.data.map((brewery, breweryIdx) => <Brewery key={breweryIdx} brewery={brewery}/>) }
                    </Stack>
                </> : null }

            { isLoading ?
                <Center>
                    <Spinner/>
                    <Text ml="4">Op zoek naar brouwerijeren bij jou in de buurt...</Text>
                </Center> : null }

            { !breweries ?
                <Center display="flex" flexDirection="column">
                    <Image maxW="48" src="/empty.jpg"/>
                    <Heading mt="4" fontWeight="semibold" fontSize="2xl">Nog niet zoveel te zien hier</Heading>
                    <Text textAlign="center" mt="2">Gebruik het bovenstaande formulier om een bierbrouwerij bij jou in de buurt te vinden.</Text>
                </Center> : null }
        </>
    )
}

export default BreweryList;