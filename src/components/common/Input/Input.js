import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import InputIconEnum from "./enums/InputIconEnum";
import InputTypeEnum from "./enums/InputTypeEnum";
import SvgIcon from "../SvgIcon/SvgIcon";
// import {validateInput} from "./helpers/validateHelper";
import './style.m.scss';

const Input = props => {
    const {
        label,
        // maxLength,
        multiline,
        disabled,
        classname,
        placeholder,
        error,
        icons,
        message,
        value,
        onChange,
        onFocus,
        onInput,
        onBlur,
        type
    } = props;
    const [query, setQuery] = React.useState(value ? `${value}` : ``);
    const [isFocused, setIsFocused] = React.useState(false);
    const inputRef = React.useRef(null);

    const hasRightIcon = React.useMemo(() => !!icons.some(icon => icon.side === InputIconEnum.right), [icons]);
    const hasLeftIcon = React.useMemo(() => !!icons.some(icon => icon.side === InputIconEnum.left), [icons]);

    React.useEffect(() => setQuery(value), [value]);

    const getClassnames = () => {
        return cn(
            "input",
            "input__native",
            `input--${type}`,
            classname,
            {
                "input__error": error,
                "input--rightIcon": hasRightIcon,
                "input--leftIcon": hasLeftIcon,
                "input--multiline": multiline
            },
        )
    };

    const onInputFocus = () => {
        setIsFocused(true);

        onFocus && onFocus();
    };

    const onInputBlur = e => {
        setIsFocused(false);

        onBlur && onBlur(e.target.value, e);
    };

    const onInputActuallyInput = e => {
        onInput && onInput(e.target.value, e);
    };

    const onInputChange = e => {
        setQuery(e.target.value);
        onChange && onChange(e.target.value, e);
    };

    const getLabel = () => {
        if (!label) {
            return null;
        }

        return <div
            onClick={() => inputRef.current.focus()}
            className={cn("input__label", { "input__label--error": (isFocused || !!query) && error })}
        >
            {label}
        </div>;
    };

    const renderRightIcon = () => {
        const iconData = icons.find(icon => icon.side === InputIconEnum.left);

        if (!iconData) {
            return null;
        }

        return <SvgIcon
            classname={cn(
                "icon",
                "left__icon",
                `left__icon--${type}`,
                iconData.classname,
                {
                    "icon--active": isFocused
                }
            )}
            Icon={iconData.Icon}
        />;
    };

    const renderLeftIcon = () => {
        const iconData = icons.find(icon => icon.side === InputIconEnum.right);

        if (!iconData) {
            return null;
        }

        return <SvgIcon
            classname={cn(
                "icon",
                "right__icon",
                `right__icon--${type}`,
                iconData.classname,
                {
                    "icon--active": isFocused
                }
            )}
            Icon={iconData.Icon}
        />;
    };

    const renderInput = () => {
        if (multiline) {
            return <textarea
                ref={inputRef}
                onChange={onInputChange}
                onInput={onInputActuallyInput}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                disabled={disabled}
                value={query}
                placeholder={placeholder}
                className={getClassnames()}
            />;
        }

        return <input
            type={type}
            ref={inputRef}
            onChange={onInputChange}
            onInput={onInputActuallyInput}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            disabled={disabled}
            multiple={multiline}
            value={query}
            placeholder={placeholder}
            className={getClassnames()}
        />;
    };

    return <div className="input__wrapper">
        {getLabel()}
        <div className="input__container">
            {renderLeftIcon()}
            {renderInput()}
            {renderRightIcon()}
        </div>
        <div className={cn("input__message", { "input__message--error": error })}>
            {message}
        </div>
    </div>
};

Input.defaultProps = {
    icons: [],
    type: InputTypeEnum.text,
    value: ``,
    placeholder: ``,
    title: ``,
    multiline: false,
    warming: false,
    error: false,
    disabled: false
};

Input.propTypes = {
    maxLength: PropTypes.number,
    multiline: PropTypes.bool,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    message: PropTypes.string,
    warning: PropTypes.bool,
    error: PropTypes.bool,
    classname: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(Object.values(InputTypeEnum)),
    icons: PropTypes.arrayOf(PropTypes.shape({})),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, null]),
    onChange: PropTypes.func,
    onInput: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func
};

export default Input;