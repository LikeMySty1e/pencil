import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Alert, Container} from "react-bootstrap";
import './style.css';

const Main = observer(() => {
    const {main} = useContext(Context);

    return `Главная`
});

export default Main;