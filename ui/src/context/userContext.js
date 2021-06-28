import React from 'react';

const UserIdContext = React.createContext({
    userId: "",
    setuserId: () => {}
});

export default UserIdContext;