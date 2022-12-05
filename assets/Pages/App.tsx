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
import axios from "axios";
import {css} from "@emotion/react";
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

        axios.get("/api/search?" + queryString)
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
                    background: rgb(250, 204, 21);
                    background-size: contain;
                    background: -webkit-linear-gradient(rgba(17, 24, 39, 0.2), rgba(17, 24, 39, 0.9)), url("/background.jpg");
                    background: linear-gradient(rgba(17, 24, 39, 0.2), rgba(17, 24, 39, 0.9)), url("/background.jpg");`}
                 bgPosition="center" bgRepeat="no-repeat">
                <Box maxW="960px" mx="auto" pt="12" pb="32" px="4">
                    <Logo/>
                    <Text textColor="gray.100" mt="32" fontSize="lg">Zoek een bierbrouwerij bij jou in de buurt!</Text>

                    <Box mt="4">
                        <form method="POST" onSubmit={handleSubmit}>
                            <InputGroup gap="2" display={{sm: "block", md: "flex"}}>
                                <Box display={{sm: "flex"}} gap="2" width="100%">
                                    <Box flexGrow="1">
                                        <FormControl isInvalid={errors.zipcode}>
                                            <InputLeftElement
                                                pointerEvents='none'
                                                children={<SearchIcon color='gray.300'/>}
                                            />
                                            <Input type="text" name="zipcode" placeholder="Vul je postcode in..."
                                                   pl="10"
                                                   required
                                                   color="white"
                                                   _placeholder={{color: 'gray.200'}}
                                                   onChange={e => setQuery({...query, zipcode: e.target.value})}/>
                                            <FormErrorMessage>
                                                {errors.zipcode}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </Box>
                                    <Box mt={[2, 0]}>
                                        <FormControl width="auto" isInvalid={errors.max_distance}>
                                            <Select type="text" name="max_distance" placeholder="Hoe ver mag het zijn?"
                                                    required
                                                    color="white"
                                                    _placeholder={{color: 'gray.200'}}
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
                                    <Button w="100%" color="gray.50" bgColor="yellow.500" _hover={{bg: "yellow.400"}}
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