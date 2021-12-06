import React from 'react';

const UserContext = React.createContext({
    userId: "",
    setuserId: () => {},
    userAccounts: [],
    setUserAccounts: () => {},
});

export default UserContext;