import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Route} from "react-router-dom";
import NavBar from './nav/nav-bar';
/*
import {getLeaderboard} from '../service/comp-service';
import {login} from '../service/auth-service';
import {getStat, getLog} from '../service/user-service';
import {
    LoginUserRequest,
} from '../transport/auth';
import {
    Ranking,
} from "../transport/comp";*/

import LandingPage from './landing/landing-page';
import LeaderboardPage from './comp/leaderboard-page';
import RulesPage from './comp/rules-page';
import DashboardPage from './user/dashboard-page';
import SubmitPage from './user/submit-page';

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

    return (
        <div className={classes.root}>
            <NavBar />
            <main id='content' className={classes.content}>
                <div className={classes.toolbar}/>
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/comp/leaderboard" component={LeaderboardPage}/>
                <Route exact path="/comp/rules" component={RulesPage}/>
                <Route exact path="/user/dashboard" component={DashboardPage}/>
                <Route exact path="/user/submit" component={SubmitPage}/>
            </main>
        </div>
    );
}

export default BasePage;


/*
    useEffect(() => {
        fetchLeaderboard();
        loginUser();
    }, []);

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


    const loginUser = async() => {

        const loginRequest = new LoginUserRequest('a', 'a');

        const response = await login(loginRequest);

        console.log(response);
    }*/