import React, {useContext} from 'react';
import {Container, Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {observer} from "mobx-react-lite";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {Context} from "../index";
import {MAIN_ROUTE} from "../resources/consts";
import './style.css';

const Auth = observer(() => {
    const {main} = useContext(Context);
    const history = useHistory();

    React.useEffect(() => main.setIsAuth(false), []);

    const onLoginClick = async () => {
        try {
            await main.loginUser();

            if (main.isAuth) {
                main.loadUserData();
                history.push(MAIN_ROUTE);
            }
        } catch ({ message }) {
            main.setAlert(message);
        }
    }

    const onRegistrationClick = async () => {
        try {
            await main.registrateUser();

            if (main.isAuth) {
                main.loadUserData();
                history.push(MAIN_ROUTE);
            }
        } catch ({ message }) {
            main.setAlert(message);
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 126}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">Авторизация</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш login..."
                        value={main.login || ``}
                        onChange={e => main.setLogin(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={main.password || ``}
                        onChange={e => main.setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <Button
                            variant={"primary"}
                            onClick={onLoginClick}
                            disabled={!main.login || !main.password}
                        >
                            Войти
                        </Button>
                    </Row>
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <Button
                            variant={"success"}
                            onClick={onRegistrationClick}
                            disabled={!main.login || !main.password}
                        >
                            Зарегистрироваться
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
