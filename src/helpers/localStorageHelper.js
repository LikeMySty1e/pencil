const localStorageKeys = {
    tokenKey: `authorisationLocalToken`
}

const localStorageHelper = {
    setLocalToken: token => {
        localStorage.setItem(localStorageKeys.tokenKey, token);
    },

    getLocalToken: () => {
        return localStorage.getItem(localStorageKeys.tokenKey);
    },

    deleteLocalToken: () => {
        localStorage.removeItem(localStorageKeys.tokenKey)
    }
}

export default localStorageHelper;
