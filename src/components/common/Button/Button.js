import React from 'react';
import cn from "classnames";
import PropTypes from 'prop-types';
import ButtonColorEnum from "./enums/ButtonColorEnum";
import './style.m.scss';

const Button = props => {
    const {
        children,
        style,
        disabled,
        onClick,
        color,
        classname
    } = props;

    const getClassnames = () => {
        return cn(
            "button",
            "button__native",
            `button--${color}`,
            classname
        )
    };

    return <button
        disabled={disabled}
        className={getClassnames()}
        style={{ ...style }}
        onClick={onClick}
    >
        {children}
    </button>;
};

Button.defaultProps = {
    style: { width: `auto` },
    color: ButtonColorEnum.primary
};

Button.propTypes = {
    style: PropTypes.shape({}),
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    color: PropTypes.oneOf(ButtonColorEnum),
    classname: PropTypes.string
};

export default Button;