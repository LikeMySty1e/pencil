import React from 'react';
import PropTypes from 'prop-types';
import cn from "classnames";
import './style.m.scss';

const SvgIcon = props => {
    const {
        classname,
        Icon,
        color
    } = props;

    if (!Icon) {
        return null;
    }

    return <Icon className={cn("svg", classname)} fill={color} />;
};

SvgIcon.defaultProps = {
    color: `white`
}

SvgIcon.propTypes = {
    classname: PropTypes.string,
    Icon: PropTypes.object
};

export default SvgIcon;