import httpClientHelper from '../http/httpClientHelper';

export const loginUser = ({ login, password }) => {
    return httpClientHelper.post('/authorization', { login, password }, false);
};

export const registrateUser = ({ username, email, password }) => {
    return httpClientHelper.post('/registration', { username, email, password });
};

export const getFeed = async (type = `moderated`) => {
    return httpClientHelper.get(`/feed/${type}`, false);
};

export default { getFeed };