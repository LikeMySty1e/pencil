import React from 'react';
import PropTypes from 'prop-types';
import cn from "classnames";
import './style.m.scss';
import SectionSizeEnum from "./enums/SectionSizeEnum";

const Section = props => {
    const {
        header,
        size,
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

    return <section className={cn("my__section", `my__section--${size}`, classname)} style={style}>
        {renderHeader()}
        {children}
    </section>;
};

Section.defaultProps = {
    size: SectionSizeEnum.normal
};

Section.propTypes = {
    header: PropTypes.string,
    size: PropTypes.oneOf(SectionSizeEnum),
    style: PropTypes.shape({}),
    classname: PropTypes.string
};

export default Section;