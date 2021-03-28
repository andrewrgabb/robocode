import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {getLeaderboard} from '../service/comp-service';
import {login} from '../service/auth-service';
import {getStat, getLog} from '../service/user-service';
import {
    LoginUserRequest,
} from '../transport/auth';
import {
    Ranking,
} from "../transport/comp";

const styles = makeStyles(theme => ({
    content: {
        display: 'flex',
        justifyContent: 'center',
        color: theme.palette.primary.main,
    },
}));

const BasePage = () => {

    const classes = styles();

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
    }

    return (
        <div className={classes.content}>
            <header className={classes.content}>
                <p onClick={() => fetchStat()}>
                    Welcome to the website!
                </p>
            </header>
        </div>
    );
}

export default BasePage;
