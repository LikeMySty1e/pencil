export const searchInData = async (query = ``, data, getData, mapper, emptySearchResult = []) => {
    if (!query) {
        return [];
    }

    if (!data && getData) {
        try {
            const response = await getData(query);

            if (response.hasOwnProperty(`ok`) && !response.ok) {
                throw new Error(`Ошибка получения данных автокомплита`);
            }

            if (mapper) {
                return mapper(response.result, emptySearchResult);
            }

            return response.result || [];
        } catch (e) {
            console.error(e.message);
        }

        return;
    }

    return data.filter(item => item.text
        .substring(0, query.length)
        .toUpperCase()
        .includes(`${query.toUpperCase()}`));
};