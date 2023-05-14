import {AUTH_ROUTE, MAIN_ROUTE, PROFILE_ROUTE} from "./resources/consts";
import Auth from "./pages/Auth";
import Main from "./pages/Main";

export const unauthorisedRoutes = [
    {
        path: AUTH_ROUTE,
        Component: Auth
    }
]

export const authorisedRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: PROFILE_ROUTE,
        Component: `Profile`
    }
]
