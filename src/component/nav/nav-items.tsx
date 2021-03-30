import {ListAlt, People, School} from '@material-ui/icons';
export const ON_ALL_PAGES = "all";

export const getTopNavItems = () => {
    return [
        {
            text: "Rules",
            loggedIn: false,
            icon: <School />,
            to: {
                pathname: "/comp/rules",
                search: "",
            }
        },
        {
            text: "Leaderboard",
            loggedIn: ON_ALL_PAGES,
            icon: <People />,
            to: {
                pathname: "/comp/leaderboard",
            },
        },
        {
            text: "Stat",
            loggedIn: true,
            icon: <ListAlt />,
            to: {
                pathname: "/user/stat",
            },
        },
    ]
}
