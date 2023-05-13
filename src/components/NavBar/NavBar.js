import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {NavLink, useHistory} from "react-router-dom";
import {Context} from "../../index";
import './style.css';

const NavBar = observer(() => {
    const {main} = useContext(Context);

    return null;

    // return (
        // <Navbar className="navigation" bg="primary" variant="light">
            {/*<Container className="justify-content-between">*/}
            {/*    <NavLink className="mainButton" to={main.isAuth ? MAIN_ROUTE: AUTH_ROUTE}>ГОСУДАРСТВЕННОЕ БЮДЖЕТНОЕ УЧРЕЖДЕНИЕ*/}
            {/*        <div className="mainButton--semi">ЗДРАВООХРАНЕНИЯ "ГОРОДСКАЯ БОЛЬНИЦА"</div>*/}
            {/*        <div className="mainButton--small">ГОРОДА БУГУРУСЛАНА</div>*/}
            {/*    </NavLink>*/}
            {/*    {main.isAuth && <Nav className="m-lg-2">*/}
            {/*        <Button*/}
            {/*            variant={'outline-light'}*/}
            {/*            onClick={() => history.replace(NEWS_ROUTE)}*/}
            {/*            className="m-lg-2"*/}
            {/*        >*/}
            {/*            Новости*/}
            {/*        </Button>*/}
            {/*        <Button*/}
            {/*            variant={'outline-light'}*/}
            {/*            onClick={() => history.replace(PROFILE_ROUTE)}*/}
            {/*            className="m-lg-2"*/}
            {/*        >*/}
            {/*            Профиль*/}
            {/*        </Button>*/}
            {/*    </Nav>}*/}
            {/*</Container>*/}
        {/*</Navbar>*/}
    // );
});

export default NavBar;