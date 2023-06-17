import React from 'react';
import {observer} from "mobx-react-lite";
import CollapsiblePanel from "../../../../components/common/CollapsiblePanel/CollapsiblePanel";
import Tag, { Type } from "../../../../components/common/Tag";
import {Context} from "../../../../index";
import Autocomplete from "../../../../components/common/Autocomplete";
import './style.m.css';

const Filters = observer(() => {
    const {main} = React.useContext(Context);

    const areasAutocompleteData = React.useMemo(() => {
        return main.areas
            .map(item => {
                return {
                    ...item,
                    text: item.name,
                    value: item.id
                }
            });
    }, [main.areas]);

    const checkTagFilter = (area = ``, checked) => {
        if (checked) {
            main.setAreas([...main.tableFilters.areas, area]);

            return;
        }

        main.setAreas(main.tableFilters.areas.filter(checkedArea => checkedArea !== area));
    };

    const renderAreas = () => {
        return <div className="filter__block">
            <CollapsiblePanel
                opened
                buttonText={`Область творчества`}
            >
                {main.areas.map(area => <Tag
                    checkedNoBackground
                    type={Type.checkbox}
                    classname="filter__tag"
                    onCheck={checked => checkTagFilter(area.id, checked)}
                    checked={main.tableFilters.areas.includes(area.id)}
                    text={area.name}
                />)}
            </CollapsiblePanel>
            <Autocomplete
                data={areasAutocompleteData}
                placeholder="Поиск"
            />
        </div>
    };

    const renderTags = () => {
        return <div className="filter__block">
            <CollapsiblePanel
                opened
                buttonText={`Теги`}
            >
                {/*{main.areas.map(area => <Tag*/}
                {/*    checkedNoBackground*/}
                {/*    type={Type.checkbox}*/}
                {/*    classname="filter__tag"*/}
                {/*    checked={main.tableFilters.areas.includes(area.id)}*/}
                {/*    text={area.name}*/}
                {/*/>)}*/}
            </CollapsiblePanel>
            <Autocomplete
                data={areasAutocompleteData}
                placeholder="Поиск"
            />
        </div>
    };

    return <div className="filters__container">
        {renderAreas()}
        {renderTags()}
    </div>;
});

export default Filters;