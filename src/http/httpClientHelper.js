import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT
});

const handleRequest = async (request) => {
    const response = await request();

    // noinspection EqualityComparisonWithCoercionJS
    // if (response.status == `401`) {
    //     localStorageHelper.deleteLocalToken();
    //     window.location.replace(`/auth`);
    //
    //     return { status: StatusEnum.Unauthorized, data: {} };
    // }

    return response;
}

const httpClientHelper = {
    async post(url, data) {
        const response = await handleRequest(() => $host.post(url, { ...data }));

        return { status: response.status, data: response.data };
    },

    async get(url, options = {}) {
        const response = await handleRequest(() => $host.get(url, options));

        return { status: response.status, data: response.data };
    },

    async upload(url, data = {}) {
        const file = data.file || {};
        const body = new FormData();

        body.append('file', file);

        const response = await handleRequest(() => $host.post(url, body));

        return { status: response.status, data: response.data };
    }
}

export default httpClientHelper;