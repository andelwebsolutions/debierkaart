import React, {FC, useState} from "react";
import {ChakraProvider} from "@chakra-ui/react";
import {
    Box,
    Heading,
    Text,
    Input,
    Select,
    InputGroup,
    InputLeftElement,
    Button,
    Flex,
    Image,
    FormControl,
    FormErrorMessage
} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import API from "../utils/API";
import { css } from "@emotion/react";
import Logo from "../components/Logo";
import BreweryList from "../components/BreweryList";
import BreweryInterface from "../interfaces/Brewery";
import QueryInterface from "../interfaces/Brewery";

const App: FC = () => {
    const [breweries, setBreweries] = useState<BreweryInterface [] | null>(null);
    const [isLoading, setIsLoading] = useState<Boolean>(0);
    const [query, setQuery] = useState<QueryInterface []>({});
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(1);
        setBreweries(null);

        const queryString = Object.keys(query)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(query[k]))
            .join("&");

        API.get("/search?" + queryString)
            .then((response) => {
                setErrors([]);
                setBreweries(response.data);
            }).catch(error => {
            if (error.response.status != 422) {
                alert('Er is iets mis gegaan. Probeer het opnieuw.');
            }

            setErrors(error.response.data);
        }).finally(() => setIsLoading(0));
    };

    return (
        <ChakraProvider>
            <Box css={css`
                    background: -webkit-linear-gradient(rgba(17, 24, 39, 0.5), rgba(17, 24, 39, 0.5)), url("/background.jpg");
                    background: linear-gradient(rgba(17, 24, 39, 0.5), rgba(17, 24, 39, 0.5)), url("/background.jpg");`}
                    bgPosition="center" bgSize="contain" bgImage="url('background.jpg')" bgRepeat="no-repeat">
                <Box maxW="760px" mx="auto" pt="8" pb="40" px="4">
                    <Logo/>
                    <Heading textColor="gray.100" mt="32" fontSize="3xl">Tijd voor een borrel? Vind de beste bierbrouweren bij jou in de buurt!</Heading>

                    <Box mt="4">
                        <form method="POST" onSubmit={handleSubmit}>
                            <InputGroup gap="2" display={{sm: "block", md: "flex"}}>
                                <Box display={{sm: "flex"}} gap="2" width="100%">
                                    <Box flexGrow="1">
                                        <FormControl isInvalid={errors.zipcode}>
                                            <InputLeftElement
                                                pointerEvents='none'
                                                children={<SearchIcon color='gray.700'/>}
                                            />
                                            <Input type="text" name="zipcode" placeholder="Vul je postcode in..."
                                                   pl="10"
                                                   bg="white"
                                                   required
                                                   color="gray.700"
                                                   _placeholder={{color: 'gray.500'}}
                                                   onChange={e => setQuery({...query, zipcode: e.target.value})}/>
                                            <FormErrorMessage>
                                                {errors.zipcode}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </Box>
                                    <Box mt={[2, 0]}>
                                        <FormControl width="auto" isInvalid={errors.max_distance}>
                                            <Select type="text" name="max_distance" placeholder="Maximale afstand"
                                                    bg="white"
                                                    required
                                                    color="gray.700"
                                                    _placeholder={{color: 'gray.500'}}
                                                    onChange={e => setQuery({...query, max_distance: e.target.value})}>
                                                <option value={5}>5 km</option>
                                                <option value={10}>10 km</option>
                                                <option value={25}>25 km</option>
                                            </Select>
                                            <FormErrorMessage>
                                                {errors.max_distance}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </Box>
                                </Box>
                                <Box mt={[2, 2, 0]}>
                                    <Button w="100%" color="gray.900" bgColor="yellow.400" _hover={{bg: "yellow.500"}}
                                            type="submit" isLoading={isLoading === 1}
                                            loadingText="Laden...">Zoeken</Button>
                                </Box>
                            </InputGroup>
                        </form>
                    </Box>
                </Box>
            </Box>

            <Box maxW="960px" mx="auto" py="12" px="4">
                <BreweryList breweries={breweries} isLoading={isLoading}/>
            </Box>

        </ChakraProvider>
    );
};

export default App;