import React from 'react';
import cn from "classnames";
import {observer} from "mobx-react-lite";
import MainTabsEnum from "../../enums/MainTabsEnum";
import Tag, { Type } from "../../../../components/common/Tag";
import { ReactComponent as FilterIcon } from "../../../../icons/filter.m.svg";
import {Context} from "../../../../index";
import './style.m.css';

const MainHeader = observer(() => {
    const {main} = React.useContext(Context);
    const filterCount = Object.values(main.tableFilters).reduce((count, value) => {
        if (Array.isArray(value)) {
            return count + value.length;
        }

        return count + 1;
    }, 0);

    const onTabClick = e => {
        if (main.loading.feed) {
            return;
        }

        main.setTab(e.target.id);
    };

    const removeTag = (area = ``) => main.setAreas(main.tableFilters.filter(filteredArea => filteredArea !== area));

    const renderTabs = () => {
        return <div className="main__tabs">
            <button
                id={MainTabsEnum.moderated}
                onClick={onTabClick}
                className={cn("main__tab", { "main__tab--active": main.tab === MainTabsEnum.moderated })}
            >
                Модерируемое
            </button>
            <button
                id={MainTabsEnum.popular}
                onClick={onTabClick}
                className={cn("main__tab", { "main__tab--active": main.tab === MainTabsEnum.popular })}
            >
                Популярное
            </button>
            <button
                id={MainTabsEnum.feed}
                onClick={onTabClick}
                className={cn("main__tab", { "main__tab--active": main.tab === MainTabsEnum.feed })}
            >
                Моя лента
            </button>
        </div>;
    };

    const renderTags = () => {
        return <div className="main__tags">
            <Tag
                checkedNoBackground
                checked
                type={Type.icon}
                icon={FilterIcon}
                text={`Фильтры`}
                additional={filterCount}
            />
            <Tag
                checkedNoBackground
                checked
                type={Type.nothing}
                text={`Очистить всё`}
                onCheck={main.clearFilters}
            />
            <div className="tags__gap" />
            {main.areas
                .filter(area => main.tableFilters.areas.includes(area.id))
                .map(area => <Tag
                    type={Type.nothing}
                    onCheck={() => removeTag(area.id)}
                    text={area.name}
                />)}
        </div>;
    };

    return <div className="main__header">
        {renderTabs()}
        {renderTags()}
    </div>;
});

export default MainHeader;