import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Route} from "react-router-dom";
import NavBar from './nav/nav-bar';

import LandingPage from './landing/landing-page';
import LeaderboardPage from './comp/leaderboard-page';
import RulesPage from './comp/rules-page';
import UserPage from './user/user-page';
import LoginPage from './auth/login-page';
import RegisterPage from './auth/register-page';

const styles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: `100vh`,
        fontFamily: `'Roboto', sans-serif`,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        [theme.breakpoints.down('xl')]: {
            paddingLeft: `23%`,
            paddingRight: `23%`,
        },
        [theme.breakpoints.down('lg')]: {
            paddingLeft: `11%`,
            paddingRight: `11%`,
        },
        [theme.breakpoints.down('md')]: {
            paddingLeft: `5%`,
            paddingRight: `5%`,
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: `5%`,
            paddingRight: `5%`,
        },
        color: theme.palette.primary.main,
        backgroundColor: `#EFEFEF`,
    },
}));

const BasePage = () => {

    const classes = styles();

    return (
        <div className={classes.root}>
            <NavBar />
            <main id='content' className={classes.content}>
                <div className={classes.toolbar}/>
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/rules" component={RulesPage}/>
                <Route exact path="/leaderboard" component={LeaderboardPage}/>
                <Route exact path="/user" component={UserPage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/register" component={RegisterPage}/>
            </main>
        </div>
    );
}

export default BasePage;