import React, { FC } from 'react';
import { Card, CardBody, CardFooter, Heading, Text, Flex, Box, HStack, Stack, Image, Spacer, Button, Center } from '@chakra-ui/react'
import Brewery from "../interfaces/brewery";

interface BreweryProps {
    brewery: Brewery;
}

const Brewery: FC = ({ brewery }: BreweryProps) => {
    // @TODO: Remove the need for this.
    const distance = brewery.distance;
    brewery = brewery[0];
    brewery.distance = distance;


    // @TODO: Clean this up
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].reduce((acc, day) => {
        acc[day.slice(0, 2)] = brewery.openOn.includes(day);
        return acc
    }, {})

    return (
        <Card direction={{ base: "column", sm: "row" }} overflow="hidden" variant="outline">
            <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src="/background.jpg"
                alt="Caffe Latte"
            />
            <Stack w="100%">
                <CardBody>
                    <Heading size='md'>{ brewery.name }</Heading>

                    <Text py='2'>
                        { brewery.address }, { brewery.city } ({brewery.distance} km)
                    </Text>
                </CardBody>

                <CardFooter>
                    <Flex w="100%">
                        <Box>
                            <Text>Open op</Text>
                            <HStack mt="1.5" spacing="2">
                                { Object.keys(days).map((day, index) =>
                                    <Center key={day}  borderRadius="4" h="10" w="10" border="1px" borderColor="yellow.400" bg={ days[day] ? "yellow.400" : "white" }>
                                        <Text color={ days[day] ? "white" : "yellow.400" }>{ day }</Text>
                                    </Center>
                                ) }
                            </HStack>
                        </Box>
                        <Spacer/>
                        <Flex flexDirection="column" justifyContent="end">
                            <Button variant='solid' colorScheme='yellow'>
                                Bekijk op Maps
                            </Button>
                        </Flex>
                    </Flex>
                </CardFooter>
            </Stack>
        </Card>
    );
}

export default Brewery;