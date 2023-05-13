import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Alert, Container} from "react-bootstrap";
import './style.css';

const Main = observer(() => {
    const {main} = useContext(Context);

    // const getDefaultKey = () => {
    //     const localKey = localStorage.getItem(`activeTab`);
    //
    //     if (Object.values(TableTabEnum).includes(localKey)) {
    //         return localKey;
    //     }
    //
    //     main.setActiveTab(TableTabEnum.Protocol);
    //     return TableTabEnum.Protocol;
    // }

    return <Container className={"mt-3"}>
        <section className="mainInfoBlock">
            <div className="infoPictureBlock">
                <img className="infoPicture" src="./pictures/hospital.jpg" alt="Больница"/>
                <div className="infoPictureText">
                    Государственное бюджетное учреждение здравоохранения
                    «Городская больница» города Бугуруслана
                </div>
            </div>
            <div className="infoTextBlock">
                <div className="textBlockSubTitle">Общая информация</div>
                <div className="textBlockMainTitle">О больнице</div>
                <div className="textBlock">
                    Наша больница является многопрофильным лечебно-профилактическим учреждением,
                    в котором оказываются следующие виды медицинской помощи: терапевтическая, хирургическая,
                    неврологическая, офтальмологическая, кардиологическая, урологическая, педиатрическая...
                    <span className="textBlockColored">
                        изотерическая, астрологическая, коммунистическая,
                        а так же лечение прочих физических и психических девиаций.
                    </span>
                </div>
            </div>
        </section>
    </Container>;
});

export default Main;