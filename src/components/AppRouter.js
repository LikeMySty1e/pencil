import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Switch, Route, Redirect} from "react-router-dom";
import {authorisedRoutes, unauthorisedRoutes} from "../routes";
import {AUTH_ROUTE, MAIN_ROUTE} from "../resources/consts";
import {Context} from "../index";

const AppRouter = observer(() => {
    const {main} = useContext(Context);
    const [mainRoute, setMainRoute] = React.useState(null);

    React.useEffect(() => {
        const route = main.isAuth ? <Redirect to={MAIN_ROUTE} exact/> : <Redirect to={AUTH_ROUTE} exact/>;

        setMainRoute(route);
    }, [main.isAuth])

    return (
        <Switch>
            {main.isAuth && authorisedRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {!main.isAuth && unauthorisedRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {mainRoute}
        </Switch>
    );
});

export default AppRouter;