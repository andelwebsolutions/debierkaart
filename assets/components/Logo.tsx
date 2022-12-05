import React, { FC } from "react";
import { Center, Heading, Image, Flex } from "@chakra-ui/react";

const Logo: FC = () => {
    return (
        <Flex alignItems="center">
            <Center h={[10, 14]} w={[10, 14]} bg="yellow.400" borderRadius="md">
                <Image h={[6, 9]} src="/logo.png"/>
            </Center>
            <Heading ml="4" textColor="white" fontSize={['xl', '3xl']}>De Bierkaart</Heading>
        </Flex>
    );
}

export default Logo;