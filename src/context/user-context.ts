import React from 'react';

const UserContext = React.createContext({
    currentUsername: null as string | null,
    isUserLoggedIn: (): boolean => {return false},
    setCurrentUsername: (username: string | null) => {},
    loginCalled: false as boolean,
})
export const UserProvider = UserContext.Provider;
export default UserContext;