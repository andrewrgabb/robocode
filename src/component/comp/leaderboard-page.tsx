import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

import { getLeaderboard } from "../../service/comp-service";
import { Ranking } from "../../transport/comp";

import Table from "./leaderboard-table";

const styles = makeStyles((theme) => ({
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
    [theme.breakpoints.down("sm")]: {
      fontSize: `34px`,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: `28px`,
      height: `34px`,
    },
  },
  subtitleContainer: {
    height: `100px`,
    color: `rgba(20,20,20,0.98)`,
    textAlign: `center`,
    fontSize: `28px`,
  },
}));

const LeaderboardPage = () => {
  const classes = styles();

  const [leaderboard, setLeaderboard] = useState<Ranking[] | null>(null);
  const [sortedByMedian, setSortedByMedian] = useState<boolean>(false);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const newLeaderboard: Ranking[] | null = await getLeaderboard();

    if (null == newLeaderboard) {
      console.log("Error fetching leaderboard");
    } else {
      setLeaderboard(newLeaderboard);
    }
  };

  let toggleSortMethod = () => {
    setSortedByMedian(!sortedByMedian);
  }

  const dsno = (no: string) => {
    if (no == "-") {
      return -10000;
    }else{
      return Number(no);
    }
  }

  return (
    <div className={classes.leaderboardContent}>
      <h1 className={classes.titleContainer}>{`Leaderboard`}</h1>
      <Table leaderboard={leaderboard ? (sortedByMedian ? leaderboard.sort((a, b) => dsno(b.medianElo) - dsno(a.medianElo)) : leaderboard.sort((a, b) => dsno(b.elo) - dsno(a.elo))) : leaderboard} toggleSortMethod={toggleSortMethod} sortedByMedian={sortedByMedian}/>
    </div>
  );
};

export default LeaderboardPage;
