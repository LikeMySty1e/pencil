import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import Container from "../../components/common/Container/Container";
import Filters from "./components/Filters/Filters";
import MainHeader from "./components/MainHeader/MainHeader";
import Feed from "./components/Feed/Feed";
import './style.m.css';

const Main = observer(() => {
    const {main} = useContext(Context);

    return <Container padding={`70px 140px`}>
        <MainHeader />
        <div className="main">
            <Filters />
            <Feed />
        </div>
    </Container>
});

export default Main;