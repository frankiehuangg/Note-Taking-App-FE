'use client'

import {Box, Button, Container, Heading, Icon, SimpleGrid, Stack, Text} from "@chakra-ui/react";
import Feature from "../components/feature.tsx";
import {FcFilledFilter, FcLock, FcOpenedFolder} from "react-icons/fc";

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
                            as={'a'}
                            href={'/note'}
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
                        icon={<Icon as={FcOpenedFolder} w={10} h={10}/>}
                        title={'Simple Organization'}
                        text={
                            'Experience effortless simplicity and unparalleled ease with our user-friendly solution!'
                        }/>
                    <Feature
                        icon={<Icon as={FcFilledFilter} w={10} h={10}/>}
                        title={'Note Typing'}
                        text={
                            'Empower your memory with customizable tags for every note, making recollection a breeze!'
                        }/>
                    <Feature
                        icon={<Icon as={FcLock} w={10} h={10}/>}
                        title={'Safety Guaranteed'}
                        text={
                            'Rest assured with our advanced JWT protection, guaranteeing the utmost privacy for your cherished secrets!'
                        }/>
                </SimpleGrid>
            </Box>
        </>
    )
}

export default IndexPage
