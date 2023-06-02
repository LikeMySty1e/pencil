import React from 'react';
import PropTypes from 'prop-types';
import cn from "classnames";
import './style.m.scss';

const Section = props => {
    const {
        header,
        classname,
        style,
        children
    } = props;

    const renderHeader = () => {
        if (!header) {
            return null;
        }

        return <div className="section__header">
            {header}
        </div>
    };

    return <section className={cn("my__section", classname)} style={style}>
        {renderHeader()}
        {children}
    </section>;
};

Section.propTypes = {
    header: PropTypes.string,
    style: PropTypes.shape({}),
    classname: PropTypes.string
};

export default Section;