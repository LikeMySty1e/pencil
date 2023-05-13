import {AUTH_ROUTE, MAIN_ROUTE, NEWS_ROUTE, PROFILE_ROUTE} from "./resources/consts";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import Profile from "./pages/Profile/Profile";
import News from "./pages/News/News";

export const unauthorisedRoutes = [
    {
        path: AUTH_ROUTE,
        Component: Auth
    },
    {
        path: NEWS_ROUTE,
        Component: News
    }
]

export const authorisedRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: NEWS_ROUTE,
        Component: News
    }
]
