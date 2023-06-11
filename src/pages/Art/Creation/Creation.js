import React from 'react';
import {observer} from "mobx-react-lite";
import {Spinner} from "react-bootstrap";
import Container from "../../../components/common/Container/Container";
import Section from "../../../components/Section";
import Input from "../../../components/common/Input";
import Tag, {Type} from "../../../components/common/Tag";
import Button from "../../../components/common/Button";
import SvgIcon from "../../../components/common/SvgIcon/SvgIcon";
import Image from "../../../components/Image";
import Autocomplete from "../../../components/common/Autocomplete";
import ArtModel from "../../../models/ArtCreationModel";
import { ReactComponent as PostIcon } from "../../../icons/post.m.svg";
import { ReactComponent as FileIcon } from "../../../icons/file.m.svg";
import {getTagsAutocomplete} from "../../../services/artDataService";
import {mapTagsAutocomplete} from "../../../helpers/mapper";
import artInstrumentsResource from "../../../resources/artInstrumentsResource";
import {Context} from "../../../index";
import './style.m.scss';

const allowedFileTypes = [`image/jpeg`, `image/png`];

const Creation = observer(() => {
    const {main} = React.useContext(Context);
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

    const onAddTag = tag => {
        if (!tag) {
            return;
        }

        if (tag.id && art.tags.find(t => t.id === tag.id)) {
            return;
        }

        updateArtModel([...art.tags, tag], `tags`);
    };

    const sortImages = (aIndex, bIndex) => {
        let newFiles = art.files;
        [newFiles[aIndex], newFiles[bIndex]] = [newFiles[bIndex], newFiles[aIndex]];

        setArt({...art, files: [...newFiles]});
    };

    const renderMainContent = () => {
        return <React.Fragment>
            <Section header={"Информация о проекте"}>
                <Input
                    value={art.title}
                    label={"Название работы"}
                    placeholder={"Введите название работы"}
                    onChange={value => updateArtModel(value, `title`)}
                />
                <Input
                    value={art.description}
                    label={"Описание"}
                    placeholder={"Введите описание работы"}
                    onChange={value => updateArtModel(value, `description`)}
                    multiline
                />
            </Section>
            <Section header={"Области творчества"}>
                Выберите до 3-х областей творчества
                <div className="creation__tags">
                    {main.areas.map(area => <Tag
                        text={area.name}
                        checked={art.areasCreativity.includes(area.id)}
                        onCheck={() => onModelCheck(area.id, `areasCreativity`, 3)}
                    />)}
                </div>
            </Section>
            <Section header={"Использованные инструменты"}>
                <div className="creation__tags">
                    {main.tools.map(tool => <Tag
                        text={tool.name}
                        type={Type.icon}
                        icon={artInstrumentsResource[tool.name]}
                        checked={art.usedTools.includes(tool.id)}
                        onCheck={() => onModelCheck(tool.id, `usedTools`, 1)}
                    />)}
                </div>
            </Section>
            <Section header={"Теги"} style={{ minHeight: `260px` }}>
                <Autocomplete
                    getData={getTagsAutocomplete}
                    mapper={mapTagsAutocomplete}
                    onSelect={tag => onAddTag(tag)}
                    placeholder={`Введите тег`}
                    allowAddNew
                    clearAfterSelect
                />
                <div className="creation__tags">
                    {art.tags.map(tag => <Tag
                        type={Type.nothing}
                        text={tag.name || tag.text}
                        onCheck={() => updateArtModel(art.tags.filter(t => t.text !== tag.text), `tags`)}
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
            onDelete={() => updateArtModel([...art.files.filter((file, i) => i !== index)], `files`)}
        />);
    };

    const renderAside = () => {
        return <React.Fragment>
            <Section>
                <Button
                    loading={main.loading.saveArt}
                    onClick={() => main.saveArt(art)}
                    style={{ width: `100%` }}
                >
                    <SvgIcon Icon={PostIcon} />
                    Опубликовать
                </Button>
            </Section>
        </React.Fragment>
    };

    if (main.loading.meta) {
        return <Container padding={`3.75vw 7.5vw`}>
            <Spinner className="feed__loader" animation="border" variant="secondary" />
        </Container>;
    }

    return <Container padding={`3.75vw 7.5vw`}>
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