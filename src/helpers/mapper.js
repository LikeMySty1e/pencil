const DataToInt = data => {
    const dataToInt = parseInt(data);

    return isNaN(dataToInt) ? data : dataToInt;
}

export default {
}