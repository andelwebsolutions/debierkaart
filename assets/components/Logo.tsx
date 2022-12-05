import React, { FC } from "react";
import { Center, Heading, Image, Flex } from "@chakra-ui/react";

const Logo: FC = () => {
    return (
        <Flex alignItems="center">
            <Center h="14" w="14" bg="yellow.400" borderRadius="md">
                <Image h="9" src="/logo.png"/>
            </Center>
            <Heading ml="4" textColor="white" fontSize="3xl">De Bierkaart</Heading>
        </Flex>
    );
}

export default Logo;