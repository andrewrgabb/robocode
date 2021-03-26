const API_BASE_URL = `/api`;

// api/auth/login

// api/auth/register

// api/user/stat

// api/user/submit

// api/user/log

// api/comp/leaderboard


const AUTH_ROOT_URL = `${API_BASE_URL}/auth`;
export const LOGIN_URL = `${AUTH_ROOT_URL}/login`;
export const REGISTER_URL = `${AUTH_ROOT_URL}/register`;

export const USER_ROOT_URL = `${API_BASE_URL}/user`;

export const STAT_URL = `${USER_ROOT_URL}/stat`;
export const SUBMIT_URL = `${USER_ROOT_URL}/submit`;
export const LOG_ROOT_URL = `${USER_ROOT_URL}/log`;

export const COMP_ROOT_URL = `${API_BASE_URL}/comp`;
export const LEADERBOARD_URL = `${COMP_ROOT_URL}/leaderboard`;

export const getLoginUrl = () => apiUrl(`${LOGIN_URL}`);
export const getRegisterUrl = () => apiUrl(`${REGISTER_URL}`);

export const getStatUrl = () => apiUrl(`${STAT_URL}`);
export const getSubmitUrl = () => apiUrl(`${SUBMIT_URL}`);
export const getLogUrl = () => apiUrl(`${LOG_ROOT_URL}`);

export const getLeaderboardUrl = () => apiUrl(`${LEADERBOARD_URL}`);


export const apiUrl = (path) => {
    if (process.env.REACT_APP_CUSTOM_NODE_ENV === "development") {
        return `${process.env.REACT_APP_BASE_URL}${path}`;
    }
    return `${window.location.origin}${path}`
}
