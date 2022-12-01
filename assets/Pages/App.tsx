import React, { FC, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Box, Heading, Text, Input, InputGroup, InputLeftElement, Button, Flex, Image, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { css } from "@emotion/react";

const App: FC = () => {
    const [breweries, setBreweries] = useState([]);
    const [isLoading, setIsLoading] = useState<Boolean>(0);
    const [query, setQuery] = useState({
        zipcode: ''
    });
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(1);
        setBreweries([]);

        const queryString = Object.keys(query)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(query[k]))
            .join("&");

        axios.get("/api/search?" + queryString)
            .then((response) => {
                setBreweries(response.data);
            }).catch(error => {
                if (error.response.status != 422) {
                    alert('Er is iets mis gegaan. Probeer het opnieuw.');
                };

                setErrors(error.response.data);
            }).finally(() => setIsLoading(0));
    };

    return (
        <ChakraProvider>
            <Box css={css`
                    background: rgb(250, 204, 21);
                    background-size: contain;
                    background: -webkit-linear-gradient(rgba(17, 24, 39, 0.2), rgba(17, 24, 39, 0.9)), url("/background.jpg");
                    background: linear-gradient(rgba(17, 24, 39, 0.2), rgba(17, 24, 39, 0.9)), url("/background.jpg");`}
                 bgPosition="center" bgRepeat="no-repeat">
                <Box maxW="960px" mx="auto" pt="48" pb="28" px="4">
                    <Flex>
                        <Image w="8" src="/logo.png"/>
                        <Heading ml="2" textColor="white" fontSize="3xl">De Bierkaart</Heading>
                    </Flex>
                    <Text textColor="gray.100" mt="4" fontSize="lg">Zoek een bierbrouwerij bij jou in de buurt!</Text>

                    <Box mt="4">
                        <form method="POST" onSubmit={handleSubmit}>
                            <InputGroup gap='2'>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<SearchIcon color='gray.300' />}
                                />
                                <FormControl isInvalid={errors.zipcode}>
                                    <Input type="text" name="zipcode" placeholder="Vul je postcode in..."
                                           pl="10"
                                           required
                                           color="white"
                                           _placeholder={{ color: 'gray.200' }}
                                           onChange={e => setQuery({ ...query, zipcode: e.target.value })}/>
                                    <FormErrorMessage>
                                        Vul een geldige postcode in.
                                    </FormErrorMessage>
                                </FormControl>
                                <Button color="gray.50" bgColor="yellow.500" _hover={{ bg: "yellow.400" }} type="submit" isLoading={isLoading === 1} loadingText="Laden...">Zoeken</Button>
                            </InputGroup>
                        </form>
                    </Box>
                </Box>
            </Box>

            <Box maxW="960px" mx="auto" py="12">
                { breweries.data && breweries.data.length
                    ? breweries.data.map((brewery, breweryIdx) => <Heading key={breweryIdx}>{brewery[0].name}</Heading>)
                    : null }
            </Box>

        </ChakraProvider>
    );
};

export default App;