import React from 'react';

const userContext = React.createContext({
    userId: "",
    setuserId: () => {},
    userAccounts: [],
    setUserAccounts: () => {},
    jobsAlreadyReceived: [], 
    setJobsAlreadyReceived: () => {}
});

export default userContext;