import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import InputIconEnum from "./enums/InputIconEnum";
import InputTypeEnum from "./enums/InputTypeEnum";
// import {validateInput} from "./helpers/validateHelper";
import './style.m.css';

const Input = props => {
    const {
        label,
        // maxLength,
        disabled,
        classname,
        placeholder,
        error,
        icon,
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

    React.useEffect(() => setQuery(value), [value]);

    const getClassnames = () => {
        return cn(
            "input",
            "input__native",
            `input__${type}`,
            classname,
            {
                ["input__error"]: error,
                [`input__${icon}__icon`]: !!icon
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
        // if (!validateInput(e.target.value, type, maxLength)) {
        //     return;
        // }

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

    return <div className="input__wrapper">
        {getLabel()}
        <input
            ref={inputRef}
            onChange={onInputChange}
            onInput={onInputActuallyInput}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            disabled={disabled}
            value={query}
            placeholder={placeholder}
            className={getClassnames()}
        />
        <div className={cn("input__message", { "input__message--error": error })}>
            {message}
        </div>
    </div>
};

Input.defaultProps = {
    type: InputTypeEnum.text,
    value: ``,
    placeholder: ``,
    title: ``,
    warming: false,
    error: false,
    disabled: false
};

Input.propTypes = {
    maxLength: PropTypes.number,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    message: PropTypes.string,
    warning: PropTypes.bool,
    error: PropTypes.bool,
    classname: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(Object.values(InputTypeEnum)),
    icon: PropTypes.oneOf(Object.values(InputIconEnum)),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, null]),
    onChange: PropTypes.func,
    onInput: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func
};

export default Input;