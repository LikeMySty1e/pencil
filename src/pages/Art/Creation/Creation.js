import React from 'react';
import {observer} from "mobx-react-lite";
// import {Context} from "../../../index";
import Container from "../../../components/common/Container/Container";
import Section from "../../../components/Section";
import Input from "../../../components/common/Input";
import Tag, {Type} from "../../../components/common/Tag";
import Button from "../../../components/common/Button";
import SvgIcon from "../../../components/common/SvgIcon/SvgIcon";
import ArtAreasEnum from "../../../enums/ArtAreasEnum";
import artInstrumentsResource from "../../../resources/artInstrumentsResource";
import ArtModel from "../../../models/ArtModel";
import { ReactComponent as PostIcon } from "../../../icons/post.m.svg";
import './style.m.scss';

const Creation = observer(() => {
    // const {main} = React.useContext(Context);
    const [art, setArt] = React.useState({ ...ArtModel });

    const updateArtModel = (value, field) => {
        if (!art.hasOwnProperty(field)) {
            return;
        }

        setArt({ ...art, [field]: value });
    };

    const onModelCheck = (elem, field, max) => {
        let newArray = [...art[field], elem];

        if (art[field].includes(elem)) {
            newArray = art[field].filter(selected => selected !== elem);
        }

        if (max && newArray.length > max) {
            newArray = newArray.slice(1);
        }

        setArt({ ...art, [field]: newArray || [] });
    }

    const renderMainContent = () => {
        return <React.Fragment>
            <Section header={"Информация о проекте"}>
                <Input
                    label={"Название работы"}
                    placeholder={"Введите название работы"}
                    onChange={value => updateArtModel(value, `name`)}
                />
                <Input
                    label={"Описание"}
                    placeholder={"Введите описание работы"}
                    onChange={value => updateArtModel(value, `name`)}
                    multiline
                />
            </Section>
            <Section header={"Области творчества"}>
                Выберите до 3-х областей творчества
                <div className="creation__tags">
                    {Object.values(ArtAreasEnum).map(area => <Tag
                        text={area}
                        checked={art.areas.includes(area)}
                        onCheck={() => onModelCheck(area, `areas`, 3)}
                    />)}
                </div>
            </Section>
            <Section header={"Использованные инструменты"}>
                <div className="creation__tags">
                    {Object.values(artInstrumentsResource).map(instrument => <Tag
                        text={instrument.value}
                        type={Type.icon}
                        icon={instrument.Icon}
                        checked={art.instruments.includes(instrument.value)}
                        onCheck={() => onModelCheck(instrument.value, `instruments`, 1)}
                    />)}
                </div>
            </Section>
        </React.Fragment>
    };

    const renderAside = () => {
        return <React.Fragment>
            <Section>
                <Button
                    onClick={() => console.log(`Cum`)}
                    style={{ width: `100%` }}
                >
                    <SvgIcon Icon={PostIcon} />
                    Опубликовать
                </Button>
            </Section>
        </React.Fragment>
    };

    return <Container padding={`70px 40px 0 7.5vw`}>
        <div className="creation__block">
            <div className="creation__main">
                {renderMainContent()}
            </div>
            <aside className="creation__aside">
                {renderAside()}
            </aside>
        </div>
    </Container>
});

export default Creation;