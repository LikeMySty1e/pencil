import MainTabsEnum from "../pages/Main/enums/MainTabsEnum";

const filterKeys = [`tags`, `areas`];

const clearDefaults = data => {
    const clearedData = {};

    Object.entries(data).map(([key, value]) => {
        if (Array.isArray(value) && !value?.length) {
            return;
        }

        clearedData[key] = value;
    });

    return clearedData;
};

export const parseUrlData = () => {
    const { hash = `` } = window.location;
    const splittedHash = hash ? hash.split(`&`) : [];

    if (!splittedHash.length) {
        return {
            tab: MainTabsEnum.moderated,
            data: {}
        }
    }

    const tabPart = splittedHash.find(part => part.includes("tab"));
    const tab = Object.values(MainTabsEnum).find(tabName => tabPart?.includes(tabName)) || MainTabsEnum.moderated;

    const otherData = {};

    splittedHash.map(part => {
        const [key, value] = part.split(`=`);

        if (!filterKeys.includes(key)) {
            return;
        }

        if (value.includes(`,`)) {
            otherData[key] = value.split(`,`);

            return;
        }

        otherData[key] = value;
    });

    return {
        tab,
        data: otherData
    };
};

export const setDataToUrl = ({ tabName, data = {} }) => {
    let stringData = ``;

    Object.entries(clearDefaults(data)).map(([key, value]) => {
        if (Array.isArray(value)) {
            stringData += `&${key}=${value.toString()}`

            return;
        }

        stringData += `&${key}=${value}`;
    });

    window.location.hash = `#tab=${tabName}${stringData}`;
};