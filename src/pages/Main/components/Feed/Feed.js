import React, { useContext } from 'react';
import {Spinner} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import Image from "../../../../components/Image";
import './style.m.scss';

const Feed = observer(() => {
    const {main} = useContext(Context);

    const renderContent = () => {
        if (main.loading.feed) {
            return <Spinner className="feed__loader" animation="border" variant="secondary" />
        }

        return main.feed.map(pic => <Image
            url={pic.previewUrl}
            onClick={() => console.log(pic.id)}
        />);
    }

    return <div className="feed">
        {renderContent()}
    </div>;
});

export default Feed;