import React, { FC } from 'react';
import { Card, CardBody, CardFooter, Heading, Text, Flex, Box, HStack, Stack, Image, Spacer, Button, Center, Link, Tag } from '@chakra-ui/react'
import Brewery from "../interfaces/brewery";

interface BreweryProps {
    brewery: Brewery;
}

const Brewery: FC = ({ brewery }: BreweryProps) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].reduce((acc, day) => {
        acc[day] = brewery.open_on.includes(day);
        return acc;
    }, {});

    return (
        <Card direction={{ base: "column", md: "row" }} overflow="hidden" variant="outline">
            <Box>
                { brewery.open_today ? <Tag top="3" left="2.5" position="absolute" bgColor="green.400" color="white">Vandaag open!</Tag> : null }
                <Image
                    h="100%"
                    objectFit="cover"
                    maxW={{ base: "100%", md: "200px" }}
                    src="/background.jpg"
                    alt="Caffe Latte"
                />
            </Box>
            <Stack w="100%">
                <CardBody>
                    <Heading size="md">{ brewery.name }</Heading>

                    <Text py="2">
                        { brewery.address }, { brewery.city } ({brewery.distance} km)
                    </Text>
                </CardBody>

                <CardFooter>
                    <Flex display={{sm: 'block', lg: 'flex'}} w="100%">
                        <Box>
                            <Text>Open op</Text>
                            <HStack mt="1.5" spacing="2">
                                { Object.keys(days).map((day, index) =>
                                    <Center key={day}  borderRadius="4" h="10" w="10" border="1px" borderColor="yellow.400" bg={ days[day] ? "yellow.400" : "white" }>
                                        <Text color={ days[day] ? "white" : "yellow.400" }>{ day.slice(0, 2) }</Text>
                                    </Center>
                                ) }
                            </HStack>
                        </Box>
                        <Spacer/>
                        <Flex mt={[2, 2, 0]} flexDirection="column" justifyContent="end">
                            <Button variant="solid" colorScheme="yellow" color="white">
                                {/*@TODO: Add link property to Brewery*/}
                                <Link target="_blank" href={'https://www.google.com/maps?q='+ brewery.name}>
                                    Bekijk op maps
                                </Link>
                            </Button>
                        </Flex>
                    </Flex>
                </CardFooter>
            </Stack>
        </Card>
    );
}

export default Brewery;