import React from 'react';

const UserContext = React.createContext({
    userId: "",
    setuserId: () => {},
    userAccounts: [],
    setUserAccounts: () => {},
    jobsAlreadyReceived: [], 
    setJobsAlreadyReceived: () => {}
});

export default UserContext;