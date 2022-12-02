import React, { FC } from 'react';
import { Stack, Text, Alert, AlertIcon, AlertTitle, AlertDescription, Center, Spinner, Heading } from "@chakra-ui/react";
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
            { breweries.data && ! breweries.data.length ?
                <Alert borderRadius="4" status="warning">
                    <AlertIcon />
                    <AlertTitle>Ah oh!</AlertTitle>
                    <AlertDescription>We konden geen brouwerijen vinden binnen een straal van {breweries.distance}km van {breweries.query.zipcode}.</AlertDescription>
                </Alert> : null }

            { breweries.data && breweries.data.length ?
                <>
                    <Text color="gray.700" fontSize="xl">{ breweries.data.length } brouwerij{breweries.data.length > 1 ? 'en' : ''} gevonden in een straal van { breweries.distance }km van { breweries.query.zipcode }.</Text>
                    <Stack mt="4" spacing="3">
                        { breweries.data.map((brewery, breweryIdx) => <Brewery key={breweryIdx} brewery={brewery}/>) }
                    </Stack>
                </> : null }

            { isLoading ?
                <Center>
                    <Spinner/>
                    <Text ml="4">Op zoek naar brouwerijeren bij jou in de buurt...</Text>
                </Center> : null }
        </>
    )
}

export default BreweryList;