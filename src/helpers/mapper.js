export const mapTagsAutocomplete = (data = [], emptySearchResult) => {
    if (!data.length) {
        return emptySearchResult;
    }

    return data.map(item => {
        return {
            ...item,
            text: item.name,
            value: item.id
        };
    });
};

export const mapArtToSave = (art = {}) => {
    const files = art.files;
    const data = { ...art, tags: art.tags.map(tag => tag.text) };

    delete data.files;

    return [files, data];
};

export default {
}