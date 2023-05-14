import React from 'react';
import cn from "classnames";
import PropTypes from "prop-types";
import './style.m.css';

const defaultPadding = `20px 40px`;

const Container = ({ children, padding = defaultPadding }) => {
    return <div className={cn(`my-container` )} style={{ padding }}>
        {children}
    </div>;
};

Container.propTypes = {
    padding: PropTypes.string
}

export default Container;