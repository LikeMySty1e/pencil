import React from 'react';
import PropTypes from 'prop-types';
import cn from "classnames";
import {observer} from "mobx-react-lite";
import Input from "../Input";
import ListItem from "./components/ListItem";
import './style.css';

const Autocomplete = observer(props => {
    const {
        data,
        selected,
        clearAfterSelect,
        onSelect
    } = props;
    const [query, setQuery] = React.useState(``);
    const [isListShowed, setIsListShowed] = React.useState(false);
    const [justSelected, setJustSelected] = React.useState(true);

    React.useEffect(() => {
        let selectedObj = selected;

        if (typeof selected === `number`) {
            selectedObj = data.find(el => el.value === selected) || {};
        }

        setQuery(selectedObj?.text || ``);
    }, []);

    const queriedItems = React.useMemo(() => {
        if (justSelected) {
            return [];
        }

        if (!query && data.length) {
            return data;
        }

        const filteredData = data.filter(item => item.text
            .substring(0, query.length)
            .toUpperCase()
            .includes(`${query.toUpperCase()}`));

        if (!filteredData.length) {
            return [{ text: `Ничего не найдено`, value: null, isNotFound: true }];
        }

        return filteredData;
    }, [query, data, isListShowed]);

    const onChangeQuery = value => {
        setJustSelected(false);
        setQuery(value);
    };

    const onItemSelect = value => {
        const selectedItem = data.find(item => item.value === value);

        if (!selectedItem) {
            throw new Error(`А как?`);
        }

        setQuery(clearAfterSelect ? `` : selectedItem.text);
        setJustSelected(true);
        setIsListShowed(false);
        onSelect && onSelect(selectedItem);
    };

    return <div className="autocomplete__container">
            <Input
                {...props}
                onFocus={() => {
                    setJustSelected(false);
                    setIsListShowed(true);
                }}
                onBlur={() => setIsListShowed(false)}
                onChange={onChangeQuery}
                value={query}
            />
            <div className={cn("autocomplete__list", { "autocomplete__list--showed": isListShowed })}>
                {queriedItems.map(item => <ListItem {...item} onSelect={onItemSelect} />)}
            </div>
        </div>;
});

Autocomplete.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        value: PropTypes.number
    })),
    selected: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
        text: PropTypes.string,
        value: PropTypes.number
    })]),
    onSelect: PropTypes.func,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    warning: PropTypes.bool,
    message: PropTypes.string,
    clearAfterSelect: PropTypes.bool,
    error: PropTypes.bool,
    classname: PropTypes.string,
    placeholder: PropTypes.string
};

export default Autocomplete;