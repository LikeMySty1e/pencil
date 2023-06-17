import React from 'react';
import PropTypes from 'prop-types';
import cn from "classnames";
import TagTypeEnum from "./enums/TagTypeEnum";
import SvgIcon from "../SvgIcon/SvgIcon";
import { ReactComponent as CheckIcon } from "../../../icons/check.m.svg";
import './style.m.scss';

const Tag = props => {
    const {
        checked,
        classname,
        checkedNoBackground,
        text,
        type,
        icon,
        additional,
        onCheck
    } = props;
    const [isChecked, setIsChecked] = React.useState(checked);

    React.useEffect(() => setIsChecked(checked), [checked, isChecked]);

    const onTagClick = e => {
        e.stopPropagation();

        setIsChecked(!checked);
        onCheck && onCheck(!checked);
    };

    const renderAdditional = () => {
        if (!additional) {
            return null;
        }

        return <div className="tag__additional">{additional}</div>
    };

    const renderIndicator = () => {
        if (type === TagTypeEnum.nothing) {
            return null;
        }

        if (type === TagTypeEnum.icon && icon) {
            return <SvgIcon Icon={icon} />;
        }

        return <div className={cn(
            "tag__checkbox",
            {
                "tag__checkbox--checked": isChecked
            }
        )}>{isChecked && <SvgIcon classname="tag__checkbox__icon" Icon={CheckIcon} />}</div>
    };

    return <div className={cn("tag__container", classname)}>
        <div
            className={cn(
                "tag",
                classname,
                {
                    "tag--active": isChecked,
                    "tag--active--background": isChecked && !checkedNoBackground
                })}
            onClick={onTagClick}
        >
            {renderIndicator()}
            {text}
            {renderAdditional()}
        </div>
    </div>;
};

Tag.defaultProps = {
    checkedNoBackground: false,
    type: TagTypeEnum.checkbox
};

Tag.propTypes = {
    checked: PropTypes.bool,
    checkedNoBackground: PropTypes.bool,
    additional: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    classname: PropTypes.string,
    type: PropTypes.oneOf(TagTypeEnum),
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.shape({})]),
    onCheck: PropTypes.func
};

export default Tag;