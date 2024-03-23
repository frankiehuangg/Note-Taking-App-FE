'use client'

import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Text,
    useColorModeValue
} from "@chakra-ui/react";

const LoginPage = () => {
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool features
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id={'email'} isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type={'email'}/>
                        </FormControl>
                        <FormControl id={'password'} isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input type={'password'}/>
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{base: 'column', sm: 'row'}}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Text color={'blue.400'}>Forget password?</Text>
                            </Stack>
                            <Button
                                loadingText={'Logging in'}
                                size={'lg'}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign in
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Don't have an account?{' '}
                                <Link color='teal.500' href='/register'>
                                    Sign up
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}

export default LoginPage