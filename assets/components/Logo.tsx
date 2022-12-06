import React, { FC } from "react";
import { Center, Heading, Image, Flex } from "@chakra-ui/react";

const Logo: FC = () => {
    return (
        <Flex alignItems="center">
            <Center h="10" w="10" bg="yellow.400" borderRadius="md">
                <Image h="7" src="/logo.png"/>
            </Center>
            <Heading ml="4" textColor="white" fontWeight="medium" fontSize={['xl', '2xl']}>De Bierkaart</Heading>
        </Flex>
    );
}

export default Logo;