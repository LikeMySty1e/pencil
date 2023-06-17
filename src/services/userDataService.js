import httpClientHelper from '../http/httpClientHelper';
import MainTabsEnum from "../pages/Main/enums/MainTabsEnum";

export const loginUser = ({ login, password }) => {
    return httpClientHelper.post('/authorization', { login, password }, false);
};

export const registrateUser = ({ username, email, password }) => {
    return httpClientHelper.post('/registration', { username, email, password });
};

export const getFeed = async (tab = MainTabsEnum.moderated) => {
    return httpClientHelper.get(`/feed/${tab}`, false);
};

export default { getFeed };