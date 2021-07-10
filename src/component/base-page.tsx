import React, { useState, useCallback, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route } from "react-router-dom";
import NavBar from "./nav/nav-bar";
import CssBaseline from "@material-ui/core/CssBaseline";
import withWidth from "@material-ui/core/withWidth";

import LandingPage from "./landing/landing-page";
import LeaderboardPage from "./comp/leaderboard-page";
import RulesPage from "./comp/rules-page";
import UserPage from "./user/user-page";
import TeamPage from "./user/team-page";
import LoginPage from "./auth/login-page";
import RegisterPage from "./auth/register-page";
import NavDrawer from "./nav/nav-drawer";
import { PinDropSharp } from "@material-ui/icons";

import { Competition } from "../transport/competition";
import { getCompetitionInfo } from "../service/competition-service";

export const drawerWidth = 240;
const styles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: `100vh`,
    fontFamily: `'Roboto', sans-serif`,
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      display: "none",
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    [theme.breakpoints.down("xl")]: {
      paddingLeft: `23%`,
      paddingRight: `23%`,
    },
    [theme.breakpoints.down("lg")]: {
      paddingLeft: `11%`,
      paddingRight: `11%`,
    },
    [theme.breakpoints.down("md")]: {
      paddingLeft: `5%`,
      paddingRight: `5%`,
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: `5%`,
      paddingRight: `5%`,
    },
    color: theme.palette.primary.main,
    backgroundColor: `#EFEFEF`,
  },
}));

const BasePage = () => {
  const classes = styles();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [compInfoFetched, setCompInfoFetched] = React.useState<boolean>(false);
  const [compInfo, setCompInfo] = useState<Competition | null>(null);

  const _getCompetitionInfo = useCallback(async () => {
    const competitionInfo: Competition | null = await getCompetitionInfo();
    if (null != competitionInfo) {
      setCompInfo(competitionInfo);
    }
    setCompInfoFetched(true);
  }, []);

  useEffect(() => {
    if (!compInfoFetched) {
      _getCompetitionInfo();
    }
  }, [compInfoFetched, _getCompetitionInfo]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const defaultedCompInfo: Competition = compInfo
    ? compInfo
    : {
        launchDate: Date.now() + 1000 * 60 * 60 * 24 * 10,
        status: "prelaunch",
      };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar drawerToggle={handleDrawerToggle} compInfo={defaultedCompInfo} />
      <nav className={classes.drawer}>
        <NavDrawer
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
          compInfo={defaultedCompInfo}
        />
      </nav>
      <main id="content" className={classes.content}>
        <div className={classes.toolbar} />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/rules" component={RulesPage} />
        <Route exact path="/leaderboard" component={LeaderboardPage} />
        <Route
          exact
          path="/user"
          render={(props) => (
            <UserPage {...props} compInfo={defaultedCompInfo} />
          )}
        />
        <Route exact path="/team" component={TeamPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </main>
    </div>
  );
};

export default BasePage;
