import React from 'react';
import PropTypes from 'prop-types';
import {observer} from "mobx-react-lite";
import cn from "classnames";
import {tooHigh, tooLow} from "./helpers/scrollHeightHelper";
import './style.m.scss';

const Image = observer(props => {
    const {
        url,
        width,
        height,
        classname,
        imageClassname,
        onClick
    } = props;
    const imageRef = React.useRef(null);
    const [isHidden, setIsHidden] = React.useState(false);

    React.useEffect(() => {
        const check = () => setIsHidden(tooHigh(imageRef.current?.offsetTop, imageRef.current?.clientHeight)
            || tooLow(imageRef.current?.offsetTop, imageRef.current?.clientHeight));

        window.addEventListener('scroll', check);
        return () => window.removeEventListener('scroll', check);
    }, []);

    const getStyles = () => {
        if (!width && !height) {
            return {};
        }

        return {
            width,
            height,
            minWidth: width,
            minHeight: height
        };
    };

    return <div
        ref={imageRef}
        onClick={onClick}
        className={cn("image__container", classname)}
        style={getStyles()}
    >
        {!isHidden && <img className={cn("image", imageClassname)} src={url} alt="Абоба"/>}
    </div>;
});

Image.defaultProps = {
    width: `246px`,
    height: `246px`
};

Image.propTypes = {
    url: PropTypes.string,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    classname: PropTypes.string,
    imageClassname: PropTypes.string,
    onClick: PropTypes.func
};

export default Image;