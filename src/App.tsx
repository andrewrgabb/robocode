import React, {useCallback, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import BasePage from './component/base-page';

import {UserProvider} from "./context/user-context";
import {getCurrentUser} from "./service/user-service";

import ProgressSpinner from "./component/reusable/progress-spinner";

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
    
    const [username, setUsername] = useState<(string | null)>(null);
    const [loginCalled, setLoginCalled] = React.useState<(boolean)>(false);

    const tryLogin = useCallback(async () => {
        const newUsername: string | null = await getCurrentUser();
        console.log(newUsername);
        if (null != newUsername) {
            setUsername(newUsername);
        }
        setLoginCalled(true);
    }, []);

    useEffect(() => {
        if (!loginCalled) {
            tryLogin();
        }
    }, [loginCalled, tryLogin]);

    if (!loginCalled) {
        return <ProgressSpinner/>;
    }

    return (
        <MuiThemeProvider theme={theme}>
            <UserProvider value={{
                    currentUsername: username,
                    isUserLoggedIn: () => (username !== null),
                    setCurrentUsername: (username) => {
                        setUsername(username);
                    },
                    loginCalled: loginCalled,
                }}>
                <Router>
                    <div>
                        <Switch>
                            <Route component={BasePage}/>
                        </Switch>
                    </div>
                </Router>
            </UserProvider>
        </MuiThemeProvider>
        
    );
}

export default App;
