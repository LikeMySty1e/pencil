const validationHelper = {
    validateState(state) {
        let check = true;

        Object.values(state).map(value => {
            if (typeof value !== 'boolean' && !value) {
                check = false;
            }
        })

        return check;
    }
}

export default validationHelper;
