/* API URLs */
const API_BASE_URL = `/api`;

// api/auth/login
// api/auth/register
const AUTH_ROOT_URL = `${API_BASE_URL}/auth`;
const LOGIN_URL = `${AUTH_ROOT_URL}/login`;
const REGISTER_URL = `${AUTH_ROOT_URL}/register`;
const LOGOUT_URL = `${AUTH_ROOT_URL}/logout`;

// api/user/stat
// api/user/submit
// api/user/log
const USER_ROOT_URL = `${API_BASE_URL}/user`;
const CURRENT_USER_URL = `${USER_ROOT_URL}/currentUser`;
const STAT_URL = `${USER_ROOT_URL}/stat`;
const SUBMIT_URL = `${USER_ROOT_URL}/submit`;
const LOG_URL = `${USER_ROOT_URL}/log`;

// api/codepack.zip
const CODEPACK_URL = `${API_BASE_URL}/codepack.zip`;

// api/leaderboard
const LEADERBOARD_URL = `${API_BASE_URL}/leaderboard`;
const COMPETITIONINFO = `${API_BASE_URL}/competitionInfo`;

export const getLoginUrl = () => apiUrl(`${LOGIN_URL}`);
export const getRegisterUrl = () => apiUrl(`${REGISTER_URL}`);
export const getLogoutUrl = () => apiUrl(`${LOGOUT_URL}`);

export const getCurrentUserUrl = () => apiUrl(`${CURRENT_USER_URL}`);
export const getStatUrl = () => apiUrl(`${STAT_URL}`);
export const getSubmitUrl = () => apiUrl(`${SUBMIT_URL}`);
export const getLogUrl = () => apiUrl(`${LOG_URL}`);

export const getCodepackUrl = () => apiUrl(`${CODEPACK_URL}`);

export const getLeaderboardUrl = () => apiUrl(`${LEADERBOARD_URL}`);
export const getCompetitionInfoUrl = () => apiUrl(`${COMPETITIONINFO}`);
// Appends the url to the correct environment
export const apiUrl = (path) => {
    // Mostly unecessary 'if' statement, but still, a little more robust than not including it.
    if (process.env.REACT_APP_CUSTOM_NODE_ENV === "development") {
        return `${process.env.REACT_APP_BASE_URL}${path}`;
    }
    return `${window.location.origin}${path}`
}