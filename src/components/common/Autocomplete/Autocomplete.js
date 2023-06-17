import React from 'react';
import PropTypes from 'prop-types';
import cn from "classnames";
import {observer} from "mobx-react-lite";
import Input, {InputIcon} from "../Input";
import ListItem from "./components/ListItem";
import {searchInData} from "./helpers/autocompleteHelper";
import {ReactComponent as SearchIcon} from "../../../icons/search.m.svg";
import './style.css';

let justCheckedTimeout;
let debounceTimeout;

const emptySearchResult = [{ text: `Ничего не найдено`, value: null, isNotFound: true }];

const Autocomplete = observer(props => {
    const {
        data,
        getData,
        allowAddNew,
        mapper,
        clearAfterSelect,
        onSelect
    } = props;
    const [query, setQuery] = React.useState(``);
    const [queriedItems, setQueriedItems] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [isListShowed, setIsListShowed] = React.useState(false);
    const itemToAdd = { text: query, value: null };

    React.useEffect(() => {
        if (!isListShowed || (!data && !getData)) {
            return setQueriedItems([]);
        }

        if (!query && data?.length) {
            return setQueriedItems(data);
        }

        const search = () => searchInData(query, data, getData, mapper, emptySearchResult)
            .then(result => setQueriedItems(result))
            .catch(e => {
                console.error(e.message);
                setQueriedItems(emptySearchResult);
            })
            .finally(() => setLoading(false));

        clearTimeout(debounceTimeout);

        setLoading(!!getData);

        if (getData) {
            debounceTimeout = setTimeout(() => search(), 350);
        } else {
            search();
        }
    }, [isListShowed, query, data]);

    const onChangeQuery = value => {
        setQuery(value);
    };

    const onItemSelect = (value, isNew = false) => {
        let selectedItem = itemToAdd;

        if (!isNew) {
            selectedItem = queriedItems.find(item => item.value === value);
        }

        setQuery(clearAfterSelect ? `` : selectedItem.text);
        setIsListShowed(false);
        onSelect && onSelect(selectedItem);
    };

    const keyDownHandler = event => {
        if (allowAddNew && event.key === 'Enter') {
            event.preventDefault();
            onItemSelect(null, true);
        }
    };

    const getIcons = () => {
        return [{
            Icon: SearchIcon,
            side: InputIcon.right
        }];
    };

    const getList = () => {
        if (loading || !queriedItems?.length) {
            return null;
        }

        return queriedItems.map(item => <ListItem {...item} onSelect={onItemSelect} />);
    };

    return <div className="autocomplete__container">
            <Input
                {...props}
                icons={getIcons()}
                onFocus={() => setIsListShowed(true)}
                onBlur={() => {
                    clearTimeout(justCheckedTimeout);
                    justCheckedTimeout = setTimeout(() => setIsListShowed(false), 250);
                }}
                onChange={onChangeQuery}
                onKeyDown={keyDownHandler}
                value={query}
            />
            <div className={cn("autocomplete__list", { "autocomplete__list--showed": isListShowed && queriedItems.length })}>
                {getList()}
            </div>
        </div>;
});

Autocomplete.defaultProps = {
    allowAddNew: false,
    clearAfterSelect: true
};

Autocomplete.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        value: PropTypes.number
    })),
    getData: PropTypes.func,
    mapper: PropTypes.func,
    selected: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
        text: PropTypes.string,
        value: PropTypes.number
    })]),
    onSelect: PropTypes.func,
    allowAddNew: PropTypes.bool,
    clearAfterSelect: PropTypes.bool,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    warning: PropTypes.bool,
    message: PropTypes.string,
    error: PropTypes.bool,
    classname: PropTypes.string,
    placeholder: PropTypes.string
};

export default Autocomplete;