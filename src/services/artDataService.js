import httpClientHelper from '../http/httpClientHelper';

export const getTools = () => {
    return httpClientHelper.get('/filter/used_tools', false);
};

export const getAreas = () => {
    return httpClientHelper.get('/filter/areas_creativity', false);
};

export const getTagsAutocomplete = (query = ``) => {
    return httpClientHelper.get(`/filter/tags/autocomplete?query=${query}`, false);
};

export const saveArt = (files, data) => {
    return httpClientHelper.upload(`/artwork`, files, data);
};

export default {
    getTools,
    getAreas,
    getTagsAutocomplete
};