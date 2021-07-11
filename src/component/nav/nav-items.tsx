import {
  Dashboard,
  ListAlt,
  TrendingUp,
  People,
  School,
  Pageview,
} from "@material-ui/icons";

export const ON_ALL_PAGES = "all";

export const getMobileHomeNavItem = () => {
  return [
    {
      text: "Home",
      loggedIn: ON_ALL_PAGES,
      icon: <Dashboard style={{ marginTop: -2 + "px" }} />,
      to: {
        pathname: "/",
        search: "",
      },
    },
  ];
};

export const getTopNavItems = () => {
  return [
    {
      text: "Rules",
      loggedIn: ON_ALL_PAGES,
      showDesktop: true,
      icon: <School />,
      to: {
        pathname:
          "https://www.notion.so/syncs/READ-ME-68e95ca047c24c82b834890488e65fc2",
        search: "",
      },
      showBeforeCompetitionStart: true,
    },
    {
      text: "Leaderboard",
      loggedIn: ON_ALL_PAGES,
      showDesktop: true,
      icon: <ListAlt />,
      to: {
        pathname: "/leaderboard",
      },
      showBeforeCompetitionStart: false,
    },
    {
      text: "Visualiser",
      loggedIn: ON_ALL_PAGES,
      showDesktop: true,
      icon: <Pageview />,
      to: {
        pathname: "http://auctions11.usydrobotics.club/api/fullLogs/visualizer",
      },
      showBeforeCompetitionStart: false,
    },
    {
      text: "Elo Charts",
      loggedIn: ON_ALL_PAGES,
      showDesktop: true,
      icon: <TrendingUp />,
      to: {
        pathname: "http://auctions11.usydrobotics.club/api/fullLogs/eloChart",
      },
      showBeforeCompetitionStart: false,
    },
    {
      text: "Code Submission",
      loggedIn: true, //true
      showDesktop: false,
      icon: <ListAlt />,
      to: {
        pathname: "/user",
      },
      showBeforeCompetitionStart: true,
    },
    {
      text: "My Team",
      loggedIn: true, //true
      showDesktop: false,
      icon: <People />,
      to: {
        pathname: "/team",
      },
      showBeforeCompetitionStart: true,
    },
  ];
};

export const getAccountItems = () => {
  return [
    {
      text: "Code Submission",
      loggedIn: true, //true
      icon: <ListAlt />,
      to: {
        pathname: "/user",
      },
      showBeforeCompetitionStart: true,
    },
    {
      text: "My Team",
      loggedIn: true, //true
      icon: <ListAlt />,
      to: {
        pathname: "/team",
      },
      showBeforeCompetitionStart: true,
    },
  ];
};
