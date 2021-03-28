import React from 'react';

import {ThemeProvider as MuiThemeProvider} from '@material-ui/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import BasePage from './component/base-page';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgba(35, 53, 165, 0.95)',
        },
        secondary: {
            main: '#11cb5f',
        },
        success: {
            main: '#079A54',
            //alt: '#057c44',
        },
        warning: {
            main: '#ff9800',
        }
    },
    breakpoints: {
        keys: ["xs", "sm", "md", "lg", "xl"],
        values: {
            xs: 360,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
});

const App = () => {

    return (
        <MuiThemeProvider theme={theme}>
            <BasePage />
        </MuiThemeProvider>
        
    );
}

export default App;
