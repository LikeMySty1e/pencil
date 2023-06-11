import {ART_ROUTE, CREATE_ROUTE, MAIN_ROUTE, PROFILE_ROUTE} from "./resources/consts";
import Main from "./pages/Main/Main";
import Creation from "./pages/Art/Creation/Creation";
import ArtPage from "./pages/Art/ArtPage/ArtPage";

export const unauthorisedRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: `${ART_ROUTE}/:id`,
        Component: ArtPage
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
        path: CREATE_ROUTE,
        Component: Creation
    },
    {
        path: `${ART_ROUTE}/:id`,
        Component: ArtPage
    }
]
