import React, {useEffect, useState}  from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";

import {getLeaderboard} from '../../service/comp-service';
import {
    Ranking,
} from "../../transport/comp";

const styles = makeStyles(theme => ({
    titleContainer: {
        height: `100px`,
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

type DisplayProps = {
    leaderboard: Ranking[] | null,
}


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

    const displayLeaderboard = ({leaderboard}: DisplayProps) => {

        if (null == leaderboard) {
            return null;
        }

        return leaderboard.map((entry) => 
            (<div key={entry.name}>
                {`${entry.name} | ${entry.elo}`}
            </div>))
    }

    return (
        <React.Fragment>
            <h1 className={classes.titleContainer}>
                {`Welcome to Leaderboard Page!`}
            </h1>
            <h2 className={classes.subtitleContainer}>
                {`This year's challenge is Auction's Eleven, a game about auctions, communication protocols, and adversarial strategy.`}
            </h2>
            <div>
                {displayLeaderboard({leaderboard})}
            </div>
        </React.Fragment>
    )
}

export default LeaderboardPage;