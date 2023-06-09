import React from 'react';
import PropTypes from 'prop-types';
import cn from "classnames";
import Button, {Color} from "../common/Button";
import SvgIcon from "../common/SvgIcon/SvgIcon";
import { ReactComponent as XCircle } from "../../icons/x-circle.m.svg";
import { ReactComponent as Save } from "../../icons/save.m.svg";
import { ReactComponent as Arrow } from "./icons/arrow.m.svg";
import './style.m.scss';
import {Spinner} from "react-bootstrap";

const Image = props => {
    const {
        classname,
        image,
        index,
        lastIndex,
        src,
        onSort,
        onSave,
        onDelete
    } = props;
    const [source, setSource] = React.useState(src || ``);
    const [loading, setLoading] = React.useState(true);

    const sortUpDisabled = React.useMemo(() => index === 0, [index, lastIndex]);
    const sortDownDisabled = React.useMemo(() => index === lastIndex - 1, [index, lastIndex]);

    React.useEffect(() => {
        let url = ``;

        if (!src && image && typeof image === `object`) {
            url = window.URL.createObjectURL(image);

            setSource(url);
        }

        return () => window.URL.revokeObjectURL(url);
    }, []);

    const sortUp = () => {
        if (sortUpDisabled) {
            return;
        }

        onSort(index, index - 1);
    };

    const sortDown = () => {
        if (sortDownDisabled) {
            return;
        }

        onSort(index, index + 1);
    };

    const renderSortButtons = () => {
        if (!lastIndex || (sortDownDisabled && sortUpDisabled) || loading) {
            return null;
        }

        return <div className="image__sort">
            <div
                role="button"
                className={cn("sort__button")}
                onClick={sortUp}
            ><SvgIcon Icon={Arrow} classname={cn("sort__icon", { "sort__disabled": sortUpDisabled })} /></div>
            <div
                role="button"
                className={cn("sort__button")}
                onClick={sortDown}
            ><SvgIcon Icon={Arrow} classname={cn("sort__icon", { "sort__disabled": sortDownDisabled })} /></div>
        </div>;
    };

    const renderDeleteButton = () => {
        if (!onDelete || loading) {
            return null;
        }

        return <Button
            color={Color.red}
            classname="image__delete"
            onClick={onDelete}
        >
            <SvgIcon Icon={XCircle} />
            Удалить
        </Button>
    };

    const renderSaveButton = () => {
        if (!onSave || loading) {
            return null;
        }

        return <Button
            onClick={onSave}
            classname="image__save"
        >
            <SvgIcon Icon={Save} />
            Сохранить
        </Button>
    };

    return <div className={cn("image__container", classname, { "image__container--loading": loading })}>
        {loading && <Spinner className="image__loader" animation="border" variant="secondary" />}
        <img
            className={cn("image", classname)}
            style={{ display: loading ? `none`: "block" }}
            src={source}
            alt={`Дыо, ты любишь кабачки?`}
            onLoad={() => setLoading(false)}
        />
        {renderSortButtons()}
        {renderDeleteButton()}
        {renderSaveButton()}
    </div>;
};

Image.propTypes = {
    classname: PropTypes.string,
    index: PropTypes.number,
    lastIndex: PropTypes.number,
    src: PropTypes.string,
    image: PropTypes.object,
    onDelete: PropTypes.func,
    onSave: PropTypes.func,
    onSort: PropTypes.func
};

export default Image;