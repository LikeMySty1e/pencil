import React from 'react';
import cn from "classnames";
import {observer} from "mobx-react-lite";
import PropTypes from 'prop-types';
import {Button} from "react-bootstrap";
import ModalWrapper from "../../../ModalWrapper/ModalWrapper";
import Input, {InputType, InputIcon} from "../../../common/Input";
import { ReactComponent as MailIcon } from '../../../../icons/mail.m.svg';
import { ReactComponent as LockIcon } from '../../../../icons/lock.m.svg';
import { ReactComponent as UserIcon } from '../../../../icons/user.m.svg';
import {Context} from "../../../../index";
import './style.m.scss';

let swipeTimeout;
let contentTimeout;

const AuthModal = observer(props => {
    const {main} = React.useContext(Context);
    const { visible, handleClose } = props;
    const [login, setLogin] = React.useState(``);
    const [email, setEmail] = React.useState(``);
    const [password, setPassword] = React.useState(``);
    const [passwordCheck, setPasswordCheck] = React.useState(``);
    const [swipe, setSwipe] = React.useState(false);
    const [isRegistration, setIsRegistration] = React.useState(false);

    React.useEffect(() => setIsRegistration(false), [visible]);

    React.useEffect(() => {
        setLogin(``);
        setEmail(``);
        setPassword(``);
        setPasswordCheck(``);
    }, [visible, isRegistration]);

    const isValid = React.useMemo(() => {
        main.setValidationError(`auth`, ``);

        return isRegistration
            ? !!login && !!email && !!password
            : !!email && !!password;
    }, [login, email, password, isRegistration]);

    const toggleForgot = () => {
        if (main.loading.auth) {
            return;
        }

        setSwipe(true);
        clearTimeout(swipeTimeout);
        clearTimeout(contentTimeout);

        contentTimeout = setTimeout(() => setIsRegistration(!isRegistration), 500);
        swipeTimeout = setTimeout(() => setSwipe(false), 1000);
    };

    const onLogin = async () => {
        const result = await main.login(email, password);

        if (result) {
            handleClose();
        }
    };

    const onRegistration = async () => {
        const result = await main.registrate(login, email, password);

        if (result) {
            handleClose();
        }
    };

    const getContent = () => {
        if (isRegistration) {
            return <React.Fragment>
                <Input
                    type={InputType.text}
                    value={login}
                    error={!!main.validationState.auth}
                    message={main.validationState.auth}
                    label={`Имя аккаунта`}
                    placeholder={`Введите имя аккаунта`}
                    icons={[
                        {
                            Icon: UserIcon,
                            side: InputIcon.left
                        }
                    ]}
                    onChange={value => setLogin(value)}
                />
                <Input
                    type={InputType.text}
                    value={email}
                    label={`Почта`}
                    placeholder={`Введите почту`}
                    icons={[
                        {
                            Icon: MailIcon,
                            side: InputIcon.left
                        }
                    ]}
                    onChange={value => setEmail(value)}
                />
                <div className="modal__row">
                    <Input
                        type={InputType.password}
                        value={password}
                        label={`Пароль`}
                        placeholder={`Придумайте пароль`}
                        icons={[
                            {
                                Icon: LockIcon,
                                side: InputIcon.left
                            }
                        ]}
                        onChange={value => setPassword(value)}
                    />
                    <Input
                        type={InputType.password}
                        value={passwordCheck}
                        error={passwordCheck && passwordCheck !== password}
                        message={(passwordCheck && passwordCheck !== password) ? `Пароли не совпадают` : ``}
                        label={`Повторите пароль`}
                        placeholder={`Повторите пароль`}
                        icons={[
                            {
                                Icon: LockIcon,
                                side: InputIcon.left
                            }
                        ]}
                        onChange={value => setPasswordCheck(value)}
                    />
                </div>
            </React.Fragment>;
        }

        return <React.Fragment>
            <Input
                type={InputType.text}
                value={email}
                label={`Почта`}
                placeholder={`Введите почту`}
                error={!!main.validationState.auth}
                message={main.validationState.auth}
                icons={[
                    {
                        Icon: MailIcon,
                        side: InputIcon.left
                    }
                ]}
                onChange={value => setEmail(value)}
            />
            <Input
                type={InputType.password}
                value={password}
                label={`Пароль`}
                placeholder={`Введите пароль`}
                icons={[
                    {
                        Icon: LockIcon,
                        side: InputIcon.left
                    }
                ]}
                onChange={value => setPassword(value)}
            />
        </React.Fragment>
    };

    return <ModalWrapper
        modalTitle={isRegistration ? `Регистрация` : `Авторизация`}
        subTitle={isRegistration ? `Введите почту и придумайте пароль` : `Введите почту и пароль`}
        classname="auth__modal"
        isShow={visible}
        handleClose={handleClose}
    >
        <div className={cn("content", { "swipe": swipe })}>
            {getContent()}
        </div>
        <div onClick={toggleForgot} className={cn("modal__link", { "fadein-out": swipe })}>
            {isRegistration ? `Вернуться` : `Регистрация`}
        </div>
        <Button
            className="modal__button"
            onClick={isRegistration ? onRegistration : onLogin}
            disabled={!isValid || main.loading.auth || main.validationState.auth}
        >
            <div className={cn({ "fadein-out": swipe })}>
                {isRegistration ? `Зарегистрироваться` : `Войти`}
            </div>
        </Button>
    </ModalWrapper>;
});

AuthModal.propTypes = {
    visible: PropTypes.bool,
    handleClose: PropTypes.func
};

export default AuthModal;