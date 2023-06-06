export const searchInData = async (query = ``, data, getData, mapper) => {
    if (!query) {
        return [];
    }

    if (!data && getData) {
        try {
            const result = await getData(query);

            if (result.hasOwnProperty(`ok`) && !result.ok) {
                throw new Error(`Ошибка получения данных автокомплита`);
            }

            if (mapper) {
                return mapper(result);
            }

            return result || [];
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