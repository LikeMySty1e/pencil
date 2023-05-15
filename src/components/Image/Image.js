import React from 'react';
import PropTypes from 'prop-types';
import {observer} from "mobx-react-lite";
import cn from "classnames";
import {tooHigh, tooLow} from "./helpers/scrollHeightHelper";
import './style.m.scss';

const Image = observer(props => {
    const {
        url,
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

    return <div ref={imageRef} onClick={onClick} className={cn("image__container", classname)}>
        {!isHidden && <img className={cn("image", imageClassname)} src={url} alt="Абоба"/>}
    </div>;
});

Image.propTypes = {
    url: PropTypes.string,
    classname: PropTypes.string,
    imageClassname: PropTypes.string,
    onClick: PropTypes.func
};

export default Image;