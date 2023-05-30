import React from 'react';
import PropTypes from 'prop-types';
import cn from "classnames";
import './style.m.scss';

const Section = props => {
    const { header, classname, children } = props;

    const renderHeader = () => {
        if (!header) {
            return null;
        }

        return <div className="section__header">
            {header}
        </div>
    };

    return <section className={cn("my__section", classname)}>
        {renderHeader()}
        {children}
    </section>;
};

Section.propTypes = {
    header: PropTypes.string,
    classname: PropTypes.string
};

export default Section;