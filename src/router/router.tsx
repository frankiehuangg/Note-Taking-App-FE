import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Sidebar from "../components/sidebar.tsx";
import IndexPage from "../pages";
import LoginPage from "../pages/login.tsx";
import RegisterPage from "../pages/register.tsx";
import NotePage from "../pages/post.tsx";

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
                element: <NotePage />
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
    }
]);

const Routes = () => {
    return (
        <RouterProvider router={routes}/>
    )
}

export default Routes