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

    return `Авторизация`;
});

export default Auth;
