export const mapTagsAutocomplete = (data = []) => {
    return data.map(item => {
        return {
            ...item,
            text: item.name,
            value: item.id
        };
    });
};

export default {
}