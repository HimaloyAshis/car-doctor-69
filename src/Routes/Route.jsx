import Main from "../layout/Main";
import Home from "../page/Home/Home";

import { createBrowserRouter } from "react-router-dom";
import Login from "../page/login/Login";
import SignUp from "../page/signup/SignUp";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/signup',
                element:<SignUp></SignUp>
            }
        ]
    }
])

export default router;
