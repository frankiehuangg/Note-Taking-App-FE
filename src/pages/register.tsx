'use client'

import React from 'react'
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Stack,
    Text,
    useColorModeValue
} from '@chakra-ui/react'
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'
import axios from 'axios'
import validator from 'validator'
import {useNavigate} from 'react-router-dom'
import constants from '../constants/constants.ts'

const RegisterPage = () => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [hasTried, setHasTried] = React.useState(false)

    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const navigate = useNavigate()

    const register = async () => {
        if (!hasTried) setHasTried(true)

        if (firstName === '' || lastName === '' || email === '' || password === '') {
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
            const response = await axios.post(`${baseURL}/api/v1/register`, {
                'first_name': firstName,
                'last_name': lastName,
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
            bg={useColorModeValue('gray.50', 'gray,800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign Up
                    </Heading>
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
                        <HStack>
                            <Box>
                                <FormControl id={'firstname'} isInvalid={firstName === '' && hasTried}>
                                    <FormLabel>First Name</FormLabel>
                                    <Input
                                        value={firstName}
                                        type={'text'}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value)}/>
                                    {firstName === '' ? (
                                        <FormErrorMessage>Your first name is required</FormErrorMessage>
                                    ) : (<> </>)}
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id={'lastname'} isInvalid={lastName === '' && hasTried}>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input
                                        value={lastName}
                                        type={'text'}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLastName(event.target.value)}/>
                                    {lastName === '' ? (
                                        <FormErrorMessage>Your last name is required</FormErrorMessage>
                                    ) : (<> </>)}
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id={'email'} isInvalid={(email === '' || !validator.isEmail(email)) && hasTried}>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                value={email}
                                type={'email'}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}/>
                            {email === '' ? (
                                <FormErrorMessage>Email is required</FormErrorMessage>
                            ) : (<></>)}
                            {!validator.isEmail(email) ? (
                                <FormErrorMessage>Invalid email</FormErrorMessage>
                            ) : (<></>)
                            }
                        </FormControl>
                        <FormControl id={'password'}
                                     isInvalid={(password === '' || !validator.isStrongPassword(password)) && hasTried}>
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
                            ) : (<></>)}
                            {!validator.isStrongPassword(password) ? (
                                <FormErrorMessage>
                                    Invalid password, must contains a lowercase, uppercase, number, and symbols each
                                    with minimum length of 8
                                </FormErrorMessage>
                            ) : (<></>)}
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                onClick={() => register()}
                                loadingText={'Submitting'}
                                size={'lg'}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already have an account?{' '}
                                <Link color={'teal.500'} href={'/login'}>
                                    Log in
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}

export default RegisterPage