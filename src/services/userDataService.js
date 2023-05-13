import httpClientHelper from '../http/httpClientHelper';

export const login = (login, password) => {
    // return { status: `success` }
    return httpClientHelper.post('/users/login', { login, password });
}

export const registration = (login, password) => {
    return httpClientHelper.post('/users/registration', { login, password });
}

export const getDateTime = () => {
    return httpClientHelper.get(`/get_datetime`);
}

export const getVisitCount = () => {
    return httpClientHelper.get(`/get_visit_count`);
}

export const getAvatar = login => {
    return httpClientHelper.get(`/files/image/${login}`, { responseType: `blob` });
}

export const getUser = () => {
    return httpClientHelper.get(`/users/profile`);
    // return new Promise(resolve => {
    //    setTimeout(() => resolve({
    //         data: {
    //             login: `Aboba`,
    //             role: `admin`
    //         },
    //         status: `success`
    //    }), 1000);
    // });
};

export const getAllUsers = () => {
    return httpClientHelper.get(`/users/get_all`);
    // return new Promise(resolve => {
    //     setTimeout(() => resolve({
    //         data: [
    //             {
    //                 id: 1,
    //                 login: `Aboba`,
    //                 role: `admin`
    //             },
    //             {
    //                 id: 2,
    //                 login: `Leha`,
    //                 role: `moderator`
    //             },
    //             {
    //                 id: 3,
    //                 login: `Jojo`,
    //                 role: `user`
    //             }
    //         ],
    //         status: `success`
    //     }), 1000);
    // });
};

export const getNews = () => {
    return httpClientHelper.get(`/news/all`);
};

export const deleteNews = id => {
    return httpClientHelper.post(`/news/delete/${id}`);
}

export const editNews = data => {
    return httpClientHelper.post(`/news/update`, data);
}

export const addNews = data => {
    return httpClientHelper.post(`/news/add`, data)
}

export const changeRole = data => {
    console.log(data)

    return httpClientHelper.post(`/users/change_role`, data);
}

export default {};