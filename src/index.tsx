import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from "./router/router.tsx";

import {ChakraProvider} from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ChakraProvider>
        <React.StrictMode>
            <Routes/>
        </React.StrictMode>
    </ChakraProvider>
)
