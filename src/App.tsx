import React from 'react';

import BasePage from './component/base-page'

const App = () => {

    console.log(`${process.env.REACT_APP_BASE_URL}`);

    return (
        <BasePage />
    );
}

export default App;
