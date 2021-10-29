//••••••••••••••
// Client URLS
//••••••••••••••

export const BASE_URL = `http://${process.env.REACT_APP_BASE_URL}`;

// Routes
export const LANDING = `/`;
export const LOGIN = `/login`;
export const REGISTER = `/register`;
export const DASHBOARD = `/dashboard`;
export const USER_SETTINGS = `/user-settings`;

// User Settings Sub-Routes
export const SETTINGS_PROFILE = `/profile`;
export const SETTINGS_LOGIN_INFO = `/login-info`;

// Redirects
export const LOGIN_SUCCES_REDIRECT = DASHBOARD;
export const NO_AUTH_REDIRECT = LOGIN;

//••••••••••••••
// Server Urls
//••••••••••••••
const authDir = 'auth';
export const SERVER_URL = `http://${process.env.REACT_APP_SERVER_URL}`;
export const GQL_SERVER_URL = `http://${process.env.REACT_APP_GQL_SERVER_URL}`;

export const SPOTIFY_AUTH = `/${authDir}/spotify/token`;
export const FACEBOOK_AUTH = `/${authDir}/facebook/token?access_token=`;
export const GOOGLE_AUTH = `/${authDir}/google/token?access_token=`;
export const LOCAL_AUTH = `/${authDir}/login`;
export const LOCAL_REGISTER = `/${authDir}/signup`;
export const LOCAL_PW_CHANGE = `/${authDir}/change-password`;
