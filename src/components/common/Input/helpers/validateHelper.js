import InputTypeEnum from "../enums/InputTypeEnum";

const passwordDenySpaces = value => (value.includes(` `));
const numbersOnly = value => (/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(value));

export const validateInput = (value, type, maxLength) => {
    if (!value) {
        return true;
    }

    if (value.length > maxLength) {
        return false;
    }

    if (type === InputTypeEnum.numbers && !numbersOnly(value, type)) {
        return false;
    }

    return !(type === InputTypeEnum.password && passwordDenySpaces(value, type));
};

export default { validateInput };