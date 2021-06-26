import { Dashboard, ListAlt, People, School } from "@material-ui/icons";

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
      icon: <School />,
      to: {
        pathname: "https://www.notion.so/syncs/READ-ME-68e95ca047c24c82b834890488e65fc2",
        search: "",
      },
      showBeforeCompetitionStart:true
    },
    {
      text: "Leaderboard",
      loggedIn: ON_ALL_PAGES,
      icon: <People />,
      to: {
        pathname: "/leaderboard",
      },
      showBeforeCompetitionStart:false
    },
    {
      text: "My Account",
      loggedIn: true, //true
      icon: <ListAlt />,
      to: {
        pathname: "/user",
      },
      showBeforeCompetitionStart:true
    },
  ];
};
