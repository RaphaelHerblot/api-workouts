import React from 'react';

// Context that allows to have access if the user is connected or not everywhere in the app

export default React.createContext({
    isAuthenticated: false,
    seIsAuthenticated: (value) => {}
});