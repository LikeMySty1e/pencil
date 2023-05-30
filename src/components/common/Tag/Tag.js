import React from 'react';
import PropTypes from 'prop-types';
import cn from "classnames";
import TagTypeEnum from "./enums/TagTypeEnum";
import SvgIcon from "../SvgIcon/SvgIcon";
import './style.m.scss';

const Tag = props => {
    const { checked, text, type, icon, onCheck } = props;

    const onTagClick = e => {
        e.stopPropagation();

        onCheck && onCheck(!checked);
    };

    const renderIndicator = () => {
        if (type === TagTypeEnum.icon && icon) {
            return <SvgIcon Icon={icon} />;
        }

        return <input
            type="checkbox"
            checked={checked}
            onChange={onTagClick}
        />
    };

    return <div className="tag__container">
        <div className={cn("tag", { "tag--active": checked })} onClick={onTagClick}>
            {renderIndicator()}
            {text}
        </div>
    </div>;
};

Tag.defaultProps = {
    type: TagTypeEnum.checkbox
};

Tag.propTypes = {
    checked: PropTypes.bool,
    text: PropTypes.string,
    type: PropTypes.oneOf(TagTypeEnum),
    icon: PropTypes.element,
    onCheck: PropTypes.func.isRequired
};

export default Tag;