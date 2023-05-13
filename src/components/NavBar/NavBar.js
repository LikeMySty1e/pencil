import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {NavLink, useHistory} from "react-router-dom";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {Context} from "../../index";
import {AUTH_ROUTE, MAIN_ROUTE, NEWS_ROUTE, PROFILE_ROUTE} from "../../resources/consts";
import PopInfo from './components/PopInfo';
import './style.css';

const NavBar = observer(() => {
    const {main} = useContext(Context);
    const history = useHistory();

    return (
        <Navbar className="navigation" bg="primary" variant="light">
            <Container className="justify-content-between">
                <NavLink className="mainButton" to={main.isAuth ? MAIN_ROUTE: AUTH_ROUTE}>ГОСУДАРСТВЕННОЕ БЮДЖЕТНОЕ УЧРЕЖДЕНИЕ
                    <div className="mainButton--semi">ЗДРАВООХРАНЕНИЯ "ГОРОДСКАЯ БОЛЬНИЦА"</div>
                    <div className="mainButton--small">ГОРОДА БУГУРУСЛАНА</div>
                </NavLink>
                {main.isAuth && <Nav className="m-lg-2">
                    <Button
                        variant={'outline-light'}
                        onClick={() => history.replace(NEWS_ROUTE)}
                        className="m-lg-2"
                    >
                        Новости
                    </Button>
                    <Button
                        variant={'outline-light'}
                        onClick={() => history.replace(PROFILE_ROUTE)}
                        className="m-lg-2"
                    >
                        Профиль
                    </Button>
                </Nav>}
            </Container>
            {main.isAuth && <PopInfo/>}
        </Navbar>
    );
});

export default NavBar;