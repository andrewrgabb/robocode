import React, {useEffect, useState}  from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";

import {getLeaderboard} from '../../service/comp-service';
import {
    Ranking,
} from "../../transport/comp";

import Table from './leaderboard-table';

const styles = makeStyles(theme => ({
    leaderboardContent: {
        display: `flex`,
        flexDirection: `column`,
        alignItems: `center`,
        justifyContent: `start`,
        padding: `0px 0px 10px 0px`,
    },
    titleContainer: {
        height: `40px`,
        color: `rgba(20,20,20,0.98)`,
        textAlign: `center`,
        fontSize: `40px`,
    },
    subtitleContainer: {
        height: `100px`,
        color: `rgba(20,20,20,0.98)`,
        textAlign: `center`,
        fontSize: `28px`,
    }
}));




const LeaderboardPage = () => {

    const classes = styles();

    const [leaderboard, setLeaderboard] = useState<(Ranking[] | null)>(null);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async() => {

        const newLeaderboard: (Ranking[] | null) = await getLeaderboard();

        if (null == newLeaderboard) {
            console.log("Error fetching leaderboard");
        } else {
            setLeaderboard(newLeaderboard);
        }
    }
    
    return (
        <div className={classes.leaderboardContent}>
            <h1 className={classes.titleContainer}>
                {`Leaderboard`}
            </h1>
            <Table leaderboard={leaderboard} />
        </div>
    )
}

export default LeaderboardPage;