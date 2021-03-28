export const ON_ALL_PAGES = "all";

export const getTopNavItems = () => {
    return [
        {
            text: "Rules",
            loggedIn: false,
            to: {
                pathname: "/rules",
                search: "",
            }
        },
        {
            text: "Leaderboard",
            loggedIn: ON_ALL_PAGES,
            to: {
                pathname: "/comp/leaderboard",
            },
        },
        {
            text: "Comp",
            loggedIn: ON_ALL_PAGES,
            to: {
                pathname: "/comp",
            },
        },
        {
            text: "Stat",
            loggedIn: true,
            to: {
                pathname: "/user/stat",
            },
        },
    ]
}
