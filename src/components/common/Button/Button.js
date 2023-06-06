import React from 'react';
import cn from "classnames";
import PropTypes from 'prop-types';
import ButtonColorEnum from "./enums/ButtonColorEnum";
import './style.m.scss';
import {Spinner} from "react-bootstrap";

const Button = props => {
    const {
        children,
        style,
        disabled,
        loading,
        onClick,
        color,
        classname
    } = props;

    const getClassnames = () => {
        return cn(
            "button",
            "button__native",
            `button--primary`,
            `button--${color}`,
            classname,
            { "button--loading": loading }
        )
    };

    const onButtonClick = e => {
        if (loading || disabled) {
            return;
        }

        onClick && onClick(e);
    };

    const renderContent = () => {
        if (loading) {
            return <Spinner animation="border" variant="secondary" />;
        }

        return children;
    };

    return <button
        disabled={disabled}
        className={getClassnames()}
        style={{ ...style }}
        onClick={onButtonClick}
    >
        {renderContent()}
    </button>;
};

Button.defaultProps = {
    style: { width: `auto` },
    color: ButtonColorEnum.primary
};

Button.propTypes = {
    style: PropTypes.shape({}),
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    color: PropTypes.oneOf(ButtonColorEnum),
    classname: PropTypes.string
};

export default Button;