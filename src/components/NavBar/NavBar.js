import React from 'react';
import {observer} from "mobx-react-lite";
import cn from "classnames";
import {NavLink} from "react-router-dom";
import {Dropdown} from "react-bootstrap";
import {CREATE_ROUTE, MAIN_ROUTE} from "../../resources/consts";
import {Context} from "../../index";
import { ReactComponent as SearchIcon } from '../../icons/search.m.svg';
import Input, {InputType, InputIcon} from "../common/Input";
import AuthModal from "./components/AuthModal/AuthModal";
import './style.m.scss';

const NavBar = observer(() => {
    const {main} = React.useContext(Context);
    const [query, setQuery] = React.useState(``);
    const [isShow, setIsShow] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);

    return <div className="navigation">
        <div className="tab__block">
            <NavLink className="logo__button" to={MAIN_ROUTE} />
            <NavLink className={cn("tab", { "tab--active": true })} to={MAIN_ROUTE}>
                Главная
            </NavLink>
            <NavLink className={cn("tab", { "tab--active": false })} to={MAIN_ROUTE}>
                Обучение
            </NavLink>
            <NavLink className={cn("tab", { "tab--active": false })} to={CREATE_ROUTE}>
                Работа
            </NavLink>
        </div>
        <Input
            value={query}
            classname="search__input"
            type={InputType.search}
            icons={[
                {
                    Icon: SearchIcon,
                    side: InputIcon.right
                }
            ]}
            placeholder={"Поиск проекта или автора"}
            onChange={value => setQuery(value)}
        />
        <Dropdown show={isShow}  autoClose={"outside"}>
            <div className="profile--mini" onClick={() => setIsShow(!isShow)} />

            <Dropdown.Menu style={{ right: `0`, top: `calc(100% + 10px)` }} variant={"dark"}>
                <Dropdown.Item onClick={() => {
                    setIsShow(false);
                    setModalVisible(!modalVisible);
                }}>
                    Профиль
                </Dropdown.Item>
                <Dropdown.Item onClick={() => {
                    setIsShow(false);
                    main.unauthorize();
                }}>
                    Выйти
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

        <AuthModal
            handleClose={() => setModalVisible(false)}
            visible={modalVisible}
        />
    </div>;
});

export default NavBar;