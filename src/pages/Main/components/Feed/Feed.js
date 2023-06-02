import React, { useContext } from 'react';
import {Spinner} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import TableImage from "../../../../components/TableImage";
import './style.m.scss';

const Feed = observer(() => {
    const {main} = useContext(Context);

    const renderContent = () => {
        if (main.loading.feed) {
            return <Spinner className="feed__loader" animation="border" variant="secondary" />
        }

        return main.feed.map(pic => <TableImage
            url={pic.previewUrl}
            width={`12vw`}
            height={`12vw`}
            onClick={() => console.log(pic.id)}
        />);
    }

    return <div className="feed">
        {renderContent()}
    </div>;
});

export default Feed;