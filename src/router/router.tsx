import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Sidebar from "../components/sidebar.tsx";
import IndexPage from "../pages/index.tsx";
import LoginPage from "../pages/login.tsx";
import RegisterPage from "../pages/register.tsx";
import NotePage from "../pages/note.tsx";
import LogoutPage from "../pages/logout.tsx";

const routes = createBrowserRouter([
    {
        element: <Sidebar/>,
        children: [
            {
                path: '/',
                element: <IndexPage/>
            },
            {
                path: '/note',
                element: <NotePage/>
            },
        ]
    },
    {
        path: '/register',
        element: <RegisterPage/>
    },
    {
        path: '/login',
        element: <LoginPage/>
    },
    {
        path: '/logout',
        element: <LogoutPage/>
    }
]);

const Routes = () => {
    return (
        <RouterProvider router={routes}/>
    )
}

export default Routes