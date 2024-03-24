'use client'

import {Spinner, Stack, Text} from "@chakra-ui/react";
import constants from "../constants/constants.ts";
import axios from "axios";
import React from "react";
import {useNavigate} from "react-router-dom";

const LogoutPage = () => {
    const navigate = useNavigate()

    React.useEffect(() => {
        const logOut = async () => {
            const baseURL = constants.BACKEND_URL

            try {
                const response = await axios.post(`${baseURL}/api/v1/logout`, {}, {withCredentials: true})
                console.log('ok')
                console.log(response)

                if (response.status === 200) {
                    console.log('ok')
                    document.cookie = 'SessionID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    navigate('/')
                }

                return response.data
            } catch (err) {
                console.log('Error: ', err)
                throw err
            }
        }

        logOut()

        return (() => {
        })
    })


    return (
        <Stack width={'100vw'} height={'100vh'} alignItems={'center'} justifyItems={'center'}>
            <Spinner
                mt={'40vh'}
                size={'xl'}
                thickness={'5px'}
                speed={'0.5s'}
                emptyColor={'gray.200'}
                color={'blue.300'}/>
            <Text size={'xl'}>Logging Out</Text>
        </Stack>
    )
}

export default LogoutPage