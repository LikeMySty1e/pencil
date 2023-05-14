import {MAIN_ROUTE, PROFILE_ROUTE} from "./resources/consts";
import Main from "./pages/Main/Main";

export const unauthorisedRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
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
