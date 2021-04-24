import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Route} from "react-router-dom";
import NavBar from './nav/nav-bar';



import LandingPage from './landing/landing-page';
import LeaderboardPage from './comp/leaderboard-page';
import RulesPage from './comp/rules-page';
import UserPage from './user/user-page';
import LoginPage from './auth/login-page';
import RegisterPage from './auth/register-page';

import { login } from '../service/auth-service';
import { LoginUserRequest } from '../transport/auth';

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

    //props: {history: History; location: Location; match: string | undefined}
    const classes = styles();

    
    /*useEffect(() => {
        loginUser();
    }, []);

    const loginUser = async() => {

        const loginRequest = new LoginUserRequest('a', 'a');

        const response = await login(loginRequest);

        console.log(response);
    }*/

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


/*
    

    const fetchLeaderboard = async() => {

        const leaderboard: (Ranking[] | null) = await getLeaderboard();

        console.log(leaderboard);
    }

    const fetchStat = async() => {

        const stat = await getStat();

        console.log(stat);

        const log = await getLog();

        console.log(log);
    }
    */