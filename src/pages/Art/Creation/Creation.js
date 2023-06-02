import React from 'react';
import {observer} from "mobx-react-lite";
// import {Context} from "../../../index";
import Container from "../../../components/common/Container/Container";
import Section from "../../../components/Section";
import Input, {InputIcon} from "../../../components/common/Input";
import Tag, {Type} from "../../../components/common/Tag";
import Button from "../../../components/common/Button";
import SvgIcon from "../../../components/common/SvgIcon/SvgIcon";
import Image from "../../../components/Image";
import Autocomplete from "../../../components/common/Autocomplete";
import ArtAreasEnum from "../../../enums/ArtAreasEnum";
import artInstrumentsResource from "../../../resources/artInstrumentsResource";
import ArtModel from "../../../models/ArtModel";
import { ReactComponent as PostIcon } from "../../../icons/post.m.svg";
import { ReactComponent as FileIcon } from "../../../icons/file.m.svg";
import {ReactComponent as SearchIcon} from "../../../icons/search.m.svg";
import './style.m.scss';

const allowedFileTypes = [`image/jpeg`, `image/png`];

const autocompleteData = [
    {
        text: `NoAI`,
        value: 1
    },
    {
        text: `People`,
        value: 2
    },
    {
        text: `ComicArt`
    }
];

const Creation = observer(() => {
    // const {main} = React.useContext(Context);
    const [art, setArt] = React.useState({ ...ArtModel });
    const inputFileRef = React.useRef(null);
    const anchor = React.useRef(null);

    React.useEffect(() => {
        if (art.files.length && anchor.current) {
            window.scrollTo(0, anchor.current.offsetTop);
        }
    }, [art.files, anchor.current]);

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
    };

    const onUpload = (files = []) => {
        const filteredImageFiles = Array.from(files).filter(file => allowedFileTypes.includes(file.type));

        updateArtModel([...art.files, ...filteredImageFiles], `files`);
    };

    const sortImages = (aIndex, bIndex) => {
        let newFiles = art.files;
        [newFiles[aIndex], newFiles[bIndex]] = [newFiles[bIndex], newFiles[aIndex]];

        setArt({...art, files: [...newFiles]});
    };

    console.log(art.files);

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
            <Section header={"Теги"} style={{ minHeight: `260px` }}>
                <Autocomplete
                    data={autocompleteData.filter(item => !art.tags.some(tag => tag.text === item.text))}
                    icons={[
                        {
                            Icon: SearchIcon,
                            side: InputIcon.right
                        }
                    ]}
                    onSelect={item => updateArtModel([...art.tags, item], `tags`)}
                    placeholder={`Введите тег`}
                    clearAfterSelect
                />
                <div className="creation__tags">
                    {art.tags.map(tag => <Tag
                        type={Type.nothing}
                        text={tag.text}
                        onCheck={() => console.log(tag.text)}
                    />)}
                </div>
            </Section>
            <Section>
                <div
                    className="upload__container"
                    onDragOver={e => e.preventDefault()}
                    onDragEnter={e => e.preventDefault()}
                    onDrop={e => {
                        e.preventDefault();
                        onUpload(e.dataTransfer.files);
                    }}
                >
                    <div className="upload__block">
                        <input
                            ref={inputFileRef}
                            style={{ display: `none` }}
                            accept={allowedFileTypes}
                            onChange={(e) => onUpload(e.target.files)}
                            type="file"
                            multiple
                        />

                        <SvgIcon classname="upload__icon" Icon={FileIcon} />
                        <div className="solid__text">Перетащите картинки сюда</div>
                        <span>ИЛИ</span>
                        <Button onClick={() => inputFileRef.current.click()}>
                            Искать на устройстве
                        </Button>
                    </div>
                </div>
            </Section>
        </React.Fragment>
    };

    const renderImages = () => {
        if (!art.files.length) {
            return null;
        }

        return art.files.map((file, index) => <Image
            key={Date.now() + index}
            image={file}
            index={index}
            lastIndex={art.files.length}
            onSort={sortImages}
            onDelete={() => setArt([...art.files.filter((file, i) => i !== index)])}
        />);
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
                {renderImages()}
                <div ref={anchor} />
            </div>
            <aside className="creation__aside">
                {renderAside()}
            </aside>
        </div>
    </Container>
});

export default Creation;