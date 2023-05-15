import httpClientHelper from '../http/httpClientHelper';

export const login = (login, password) => {
    return httpClientHelper.post('/users/login', { login, password });
}

export const getFeed = async (type = `moderated`) => {
     const { data } = await httpClientHelper.get(`/feed/${type}`);

     return data;
}

export default {};