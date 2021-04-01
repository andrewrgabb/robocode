import {ListAlt, People, School} from '@material-ui/icons';
export const ON_ALL_PAGES = "all";

export const getTopNavItems = () => {
    return [
        {
            text: "Rules",
            loggedIn: ON_ALL_PAGES,
            icon: <School />,
            to: {
                pathname: "/rules",
                search: "",
            }
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
            loggedIn: false, //true
            icon: <ListAlt />,
            to: {
                pathname: "/user",
            },
        },
    ]
}
