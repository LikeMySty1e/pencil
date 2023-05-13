export const jsonParser = {
    parseArray(jsonArray) {
        return jsonArray.map(row => JSON.parse(row));
    },

    parse(json) {
        return JSON.parse(json);
    }
}

export default jsonParser;