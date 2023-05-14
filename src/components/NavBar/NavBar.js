import React from 'react';
import {observer} from "mobx-react-lite";
import cn from "classnames";
import {NavLink} from "react-router-dom";
import {MAIN_ROUTE} from "../../resources/consts";
import {Context} from "../../index";
import Input, {InputType} from "../common/Input";
import './style.m.css';

const NavBar = observer(() => {
    // const {main} = React.useContext(Context);
    const [query, setQuery] = React.useState(``);

    return <div className="navigation">
        <div className="tab__block">
            <NavLink className="logo__button" to={MAIN_ROUTE} />
            <NavLink className={cn("tab", { "tab--active": true })} to={MAIN_ROUTE}>
                Главная
            </NavLink>
            <NavLink className={cn("tab", { "tab--active": false })} to={MAIN_ROUTE}>
                Обучение
            </NavLink>
            <NavLink className={cn("tab", { "tab--active": false })} to={MAIN_ROUTE}>
                Работа
            </NavLink>
        </div>
        <Input
            value={query}
            classname="search__input"
            type={InputType.search}
            placeholder={"Поиск проекта или автора"}
            onChange={value => setQuery(value)}
        />
        <div className="profile--mini" />
    </div>;
});

export default NavBar;