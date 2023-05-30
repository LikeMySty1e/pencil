import {ART_ROUTE, MAIN_ROUTE, PROFILE_ROUTE} from "./resources/consts";
import Main from "./pages/Main/Main";
import Creation from "./pages/Art/Creation/Creation";

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
    },
    {
        path: ART_ROUTE,
        Component: Creation
    }
]
