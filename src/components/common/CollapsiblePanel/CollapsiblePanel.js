import React from 'react';
import PropTypes from 'prop-types';
import cn from "classnames";
import SvgIcon from "../SvgIcon/SvgIcon";
import { ReactComponent as TriangleIcon } from "../../../icons/triangle.m.svg";
import './style.m.scss';

const CollapsiblePanel = props => {
    const {
        opened,
        children,
        buttonClassname,
        buttonText
    } = props;
    const [isOpened, setIsOpened] = React.useState(opened);

    React.useEffect(() => setIsOpened(opened), [opened]);

    return <div className="collapsible__panel__container">
        <div className="panel__button__container">
            <button className={cn("panel__button", buttonClassname)} onClick={e => {
                    e.preventDefault();
                    setIsOpened(!isOpened);
                }}
            >{buttonText}</button>
            <div className={cn("panel__icon", { "panel__icon--upside": !isOpened })}>
                <SvgIcon Icon={TriangleIcon} />
            </div>
        </div>
        <div className={cn("collapsible__content", { "collapsible__content--showed": isOpened  })}>
            {children}
        </div>
    </div>;
};

CollapsiblePanel.propTypes = {
    opened: PropTypes.bool,
    buttonText: PropTypes.string,
    buttonClassname: PropTypes.string
};

export default CollapsiblePanel;