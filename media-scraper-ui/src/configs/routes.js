import Home from "../pages/Home";
import Share from "../pages/Share";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

export const ROUTES = [
    {
        path: '/sign-in',
        exact: true,
        auth: false,
        component: SignIn
    },
    {
        path: '/sign-up',
        exact: true,
        auth: false,
        component: SignUp
    },
    {
        path: '/',
        exact: true,
        auth: true,
        component: Home
    },
    {
        path: '/share',
        exact: false,
        auth: true,
        component: Share
    }
]