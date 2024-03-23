'use client'

import {Box, Button, Container, Heading, Icon, SimpleGrid, Stack, Text} from "@chakra-ui/react";
import Feature from "../components/feature.tsx";
import {FcFilledFilter, FcLock, FcStackOfPhotos} from "react-icons/fc";

const IndexPage = () => {
    return (
        <>
            <Container maxW={'3xl'}>
                <Stack
                    as={Box}
                    textAlign={'center'}
                    spacing={{base: 8, md: 14}}
                    py={{base: 20, md: 36}}>
                    <Heading
                        fontWeight={600}
                        fontSize={{base: '2xl', sm: '4xl', md: '6xl '}}
                        lineHeight={'110%'}>
                        Take your class notes <br/>
                        <Text as={'span'} color={'black.700'}>
                            quickly & easily!
                        </Text>
                    </Heading>
                    <Text color={'gray.500'}>
                        Simple and intuitive note taking app to boost your
                        productivity in class for free!
                    </Text>
                    <Stack
                        direction={'column'}
                        spacing={3}
                        align={'center'}
                        alignSelf={'center'}
                        position={'relative'}>
                        <Button
                            colorScheme={'blue'}
                            bg={'blue.400'}
                            rounded={'full'}
                            px={6}
                            _hover={{
                                bg: 'blue.500',
                            }}>
                            Get Started!
                        </Button>
                    </Stack>
                </Stack>
            </Container>
            <Box p={4}>
                <SimpleGrid columns={{base: 1, md: 3}} spacing={10}>
                    <Feature
                        icon={<Icon as={FcStackOfPhotos} w={10} h={10}/>}
                        title={'Image Support'}
                        text={
                            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                        }/>
                    <Feature
                        icon={<Icon as={FcFilledFilter} w={10} h={10}/>}
                        title={'Note Filtering'}
                        text={
                            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                        }/>
                    <Feature
                        icon={<Icon as={FcLock} w={10} h={10}/>}
                        title={'Safety Guaranteed'}
                        text={
                            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                        }/>
                </SimpleGrid>
            </Box>
        </>
    )
}

export default IndexPage
