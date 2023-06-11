import React from 'react';
import {observer} from "mobx-react-lite";
import {Spinner} from "react-bootstrap";
import Container from "../../../components/common/Container/Container";
import Button from "../../../components/common/Button";
import SvgIcon from "../../../components/common/SvgIcon/SvgIcon";
import Section, {Size} from "../../../components/Section";
import Tag, {Type} from "../../../components/common/Tag";
import Image from "../../../components/Image";
import { ReactComponent as UserPlus } from "../../../icons/userPlus.m.svg";
import { ReactComponent as Like } from "../../../icons/like.m.svg";
import { ReactComponent as View } from "../../../icons/eye.m.svg";
import { ReactComponent as Share } from "../../../icons/share.m.svg";
import artInstrumentsResource from "../../../resources/artInstrumentsResource";
import {Context} from "../../../index";
import './style.m.scss';

const ArtPage = observer(props => {
    const {main} = React.useContext(Context);
    const { id } = props.match.params;
    const [expanded, setExpanded] = React.useState(false);
    const anchor = React.useRef(null);

    React.useEffect(() => {
        main.loadArt(id);
    }, []);

    const renderAside = () => {
        return <React.Fragment>
            <Section size={Size.mini}>
                <div className="my__section--flex">
                    <div className="profile--mini" onClick={() => console.log(`Абоба`)} />
                    <div className="author__name">{main.art.author.username}</div>
                </div>
                <Button
                    onClick={() => console.log(`Абоба`)}
                    style={{ width: `100%`, marginTop: `12px` }}
                >
                    <SvgIcon Icon={UserPlus} />
                    Подписаться
                </Button>
            </Section>
            <Section header={"Области творчества"}>
                <div className="creation__tags">
                    {main.art.areasCreativity.map(area => <Tag
                        type={Type.nothing}
                        text={area.name}
                        checked={false}
                    />)}
                </div>
            </Section>
            <Section header={"Использованные инструменты"}>
                <div className="creation__tags">
                    {main.art.usedTools.map(tool => <Tag
                        text={tool.name}
                        type={Type.icon}
                        icon={artInstrumentsResource[tool.name]}
                        checked={false}
                    />)}
                </div>
            </Section>
            <Section header={"Теги"}>
                <div className="creation__tags">
                    {main.art.tags.map(tag => <Tag
                        type={Type.nothing}
                        text={tag.name || tag.text}
                        checked={false}
                    />)}
                </div>
            </Section>
        </React.Fragment>
    };

    const renderImages = () => {
        const artCount = main.art.attachments.length;

        const images = expanded
            ? main.art.attachments.map((art, index) => <Image
                classname="art__image"
                key={Date.now() + index}
                src={art?.sizes?.x || art?.sizes?.o}
                onSave={index === 0 ? () => console.log(`ЫЫЫЫ`) : null}
            />)
            : <Image
                classname="art__image"
                key={Date.now()}
                src={main.art.attachments[0]?.sizes?.x || main.art.attachments[0]?.sizes?.o}
                onSave={() => console.log(`ЫЫЫЫ`)}
            />;

        return <div className="art__images">
            {images}
            <div className="art__controls">
                <div className="art__count">
                    {expanded ? artCount : 1}
                    /
                    {artCount}</div>
                {artCount > 1 && <Button onClick={() => setExpanded(!expanded)}>
                    {expanded ? `Скрыть` : `Показать все`}
                </Button>}
                <div className="art__extras">
                    <SvgIcon classname="controls__icon" Icon={Like} />
                    <span className="controls__icon--text">32</span>
                    <SvgIcon classname="controls__icon" Icon={View} />
                    <span className="controls__icon--text">66</span>
                    <SvgIcon classname="controls__icon" Icon={Share} />
                </div>
            </div>
        </div>
    };

    const renderDescription = () => {
        return <React.Fragment>
            <Section>
                <div className="art__description">{main.art.description}</div>
            </Section>
        </React.Fragment>
    };

    if (main.loading.art) {
        return <Container padding={`3.75vw 15vw`}>
            <Spinner className="feed__loader" animation="border" variant="secondary" />
        </Container>;
    }

    return <Container padding={`calc(3.75vw - 20px) 15vw`}>
            <div className="art__header">
                <div className="art__title">{main.art.title}</div>
                <div className="art__date">Опубликовано: {new Date(main.art.createDate).toLocaleDateString()}</div>
            </div>
            <div className="art__block">
                <div className="art__main">
                    {/*{renderMainContent()}*/}
                    {renderImages()}
                    <div ref={anchor} />
                    {renderDescription()}
                </div>
                <aside className="art__aside">
                    {renderAside()}
                </aside>
            </div>
        </Container>;
});

export default ArtPage;