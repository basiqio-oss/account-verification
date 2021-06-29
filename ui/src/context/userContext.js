import React from 'react';

const userContext = React.createContext({
    userId: "",
    setuserId: () => {},
    userAccounts: []
});

export default userContext;