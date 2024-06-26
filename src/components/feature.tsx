'use client'

import {ReactElement} from "react";
import {Flex, Stack, Text} from "@chakra-ui/react";

interface FeatureProps {
    title: string,
    text: string,
    icon: ReactElement
}

const Feature = ({title, text, icon}: FeatureProps) => {
    return (
        <Stack
            align={'center'}
            justify={'center'}>
            <Flex
                w={16}
                h={16}
                align={'center'}
                justify={'center'}
                color={'white'}
                rounded={'full'}
                bg={'gray.100'}
                mb={1}>
                {icon}
            </Flex>
            <Text fontWeight={600}>{title}</Text>
            <Text color={'gray.600'}>{text}</Text>
        </Stack>
    )
}

export default Feature