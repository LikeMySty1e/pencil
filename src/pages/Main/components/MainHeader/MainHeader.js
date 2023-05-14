import React from 'react';
import cn from "classnames";
import PropTypes from 'prop-types';
import MainTabsEnum from "../../enums/MainTabsEnum";
import './style.m.css';

const MainHeader = props => {
    const [active, setActive] = React.useState(MainTabsEnum.moderate);

    const onTabClick = e => setActive(e.target.id);

    return <div className="main__header">
            <div className="main__tabs">
                <button
                    id={MainTabsEnum.moderate}
                    onClick={onTabClick}
                    className={cn("main__tab", { "main__tab--active": active === MainTabsEnum.moderate })}
                >
                    Модерируемое
                </button>
                <button
                    id={MainTabsEnum.popular}
                    onClick={onTabClick}
                    className={cn("main__tab", { "main__tab--active": active === MainTabsEnum.popular })
                }>
                    Популярное
                </button>
                <button
                    id={MainTabsEnum.feed}
                    onClick={onTabClick}
                    className={cn("main__tab", { "main__tab--active": active === MainTabsEnum.feed })}
                >
                    Моя лента
                </button>
            </div>
        </div>;
};

MainHeader.propTypes = {

};

export default MainHeader;