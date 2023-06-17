import React from 'react';

export const useToggle = initialState => {
    const [active, setIsActive] = React.useState(!!initialState);

    const toggle = () => setIsActive(prevState => !prevState);

    return [active, toggle];
};

export default { useToggle };
