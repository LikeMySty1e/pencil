import React from 'react';
import {observer} from "mobx-react-lite";
import cn from "classnames";
import {NavLink} from "react-router-dom";
import {AUTH_ROUTE, MAIN_ROUTE} from "../../resources/consts";
import {Context} from "../../index";
import './style.m.css';

const NavBar = observer(() => {
    const {main} = React.useContext(Context);

    return <div className="navigation">
        <NavLink className={cn("tab", { "tab--active": true })} to={main.isAuth ? MAIN_ROUTE: AUTH_ROUTE}>
            Главная
        </NavLink>
        <NavLink className={cn("tab", { "tab--active": false })} to={main.isAuth ? MAIN_ROUTE: AUTH_ROUTE}>
            Обучение
        </NavLink>
        <NavLink className={cn("tab", { "tab--active": false })} to={main.isAuth ? MAIN_ROUTE: AUTH_ROUTE}>
            Работа
        </NavLink>

        <div className={'text-white btn btn-ex'}>
            Check bs styles
        </div>
    </div>;

    // return (
        // <Navbar className="navigation" bg="primary" variant="light">
        //     {/*<Container className="justify-content-between">*/}
        //     {/*    <NavLink className="mainButton" to={main.isAuth ? MAIN_ROUTE: AUTH_ROUTE}>ГОСУДАРСТВЕННОЕ БЮДЖЕТНОЕ УЧРЕЖДЕНИЕ*/}
        //     {/*        <div className="mainButton--semi">ЗДРАВООХРАНЕНИЯ "ГОРОДСКАЯ БОЛЬНИЦА"</div>*/}
        //     {/*        <div className="mainButton--small">ГОРОДА БУГУРУСЛАНА</div>*/}
        //     {/*    </NavLink>*/}
        //     {/*    {main.isAuth && <Nav className="m-lg-2">*/}
        //     {/*        <Button*/}
        //     {/*            variant={'outline-light'}*/}
        //     {/*            onClick={() => history.replace(NEWS_ROUTE)}*/}
        //     {/*            className="m-lg-2"*/}
        //     {/*        >*/}
        //     {/*            Новости*/}
        //     {/*        </Button>*/}
        //     {/*        <Button*/}
        //     {/*            variant={'outline-light'}*/}
        //     {/*            onClick={() => history.replace(PROFILE_ROUTE)}*/}
        //     {/*            className="m-lg-2"*/}
        //     {/*        >*/}
        //     {/*            Профиль*/}
        //     {/*        </Button>*/}
        //     {/*    </Nav>}*/}
        //     {/*</Container>*/}
        // {/*</Navbar>*/}
    // );
});

export default NavBar;