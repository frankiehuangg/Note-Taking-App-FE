'use client'

import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Stack,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import React, {useState} from "react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";
import validator from "validator";
import constants from "../constants/constants.ts";
import axios from "axios";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [hasTried, setHasTried] = useState(false)

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const navigate = useNavigate()
    const logIn = async () => {
        if (!hasTried) setHasTried(true)

        if (email === '' || password === '') {
            return
        }

        if (!validator.isEmail(email)) {
            return
        }
        if (!validator.isStrongPassword(password)) {
            return
        }

        const baseURL = constants.BACKEND_URL

        try {
            const response = await axios.post(`${baseURL}/api/v1/login`, {
                'email': email,
                'password': password
            }, {withCredentials: true})


            if (response.status === 200) {
                navigate('/')
            }

            return response.data
        } catch (err) {
            console.log('Error: ', err)
            throw err
        }
    }

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
                        <FormControl id={'email'} isInvalid={email === '' && hasTried}>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                value={email}
                                type={'email'}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}/>
                            {email === '' ? (
                                <FormErrorMessage>Email is required</FormErrorMessage>
                            ) : (<> </>)}
                        </FormControl>
                        <FormControl id={'password'} isInvalid={password === '' && hasTried}>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    value={password}
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}/>
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {password === '' ? (
                                <FormErrorMessage>Password is required</FormErrorMessage>
                            ) : (<> </>)}
                        </FormControl>
                        <Stack spacing={10}>
                            <Button
                                onClick={() => logIn()}
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