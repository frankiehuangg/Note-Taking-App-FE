'use client'

import {useState} from "react";
import {
    Box, Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input, InputGroup, InputRightElement, Link,
    Stack,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false)

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
                                <FormControl id={'firstname'} isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input type={'text'} />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id={'lastname'} isRequired>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input type={'text'} />
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id={'email'} isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type={'email'} />
                        </FormControl>
                        <FormControl id={'password'} isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)} />
                                    {showPassword ? <ViewIcon /> : <ViewOffIcon /> }
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
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