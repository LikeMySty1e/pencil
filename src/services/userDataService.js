import httpClientHelper from '../http/httpClientHelper';

export const login = (login, password) => {
    return httpClientHelper.post('/users/login', { login, password });
}

export default {};