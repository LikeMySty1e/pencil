import httpClientHelper from '../http/httpClientHelper';

export const getTools = () => {
    return httpClientHelper.get('/filter/used_tools');
};

export const getAreas = () => {
    return httpClientHelper.get('/filter/areas_creativity');
};

export const getTagsAutocomplete = (query = ``) => {
    return httpClientHelper.get(`/filter/tags/autocomplete?query=${query}`);
};

export default {
    getTools,
    getAreas,
    getTagsAutocomplete
};