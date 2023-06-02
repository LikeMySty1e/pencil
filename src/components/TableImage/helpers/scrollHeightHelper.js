export const tooLow = (offsetY, height) => {
    const bottomOfScreen = window.scrollY + document.documentElement.clientHeight;

    return (offsetY - bottomOfScreen > height * 10);
}

export const tooHigh = (offsetY, height) => {
    const topOfScreen = window.scrollY;

    return (topOfScreen - offsetY > height * 10);
}

export default {};