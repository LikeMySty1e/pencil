import React from 'react';
import PropTypes from 'prop-types';
import cn from "classnames";
import '../../style.css';

const ListItem = props => {
    const { text, isNotFound, value, onSelect } = props;

    return <div
        key={`${text}_${value}`}
        className={cn("autocomplete__item", { "autocomplete__item--despicable": isNotFound })}
        onClick={() => onSelect(value)}
    >
        {text}
    </div>;
};

ListItem.propTypes = {
    text: PropTypes.string,
    isNotFound: PropTypes.bool,
    value: PropTypes.number,
    onSelect: PropTypes.func
};

export default ListItem;