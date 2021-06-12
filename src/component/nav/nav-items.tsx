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
        pathname: "/rules",
        search: "",
      },
    },
    {
      text: "Leaderboard",
      loggedIn: ON_ALL_PAGES,
      icon: <People />,
      to: {
        pathname: "/leaderboard",
      },
    },
    {
      text: "My Account",
      loggedIn: true, //true
      icon: <ListAlt />,
      to: {
        pathname: "/user",
      },
    },
  ];
};
