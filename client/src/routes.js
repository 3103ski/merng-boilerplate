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
export const SERVER_URL = `http://${process.env.REACT_APP_SERVER_URL}`;
export const GQL_SERVER_URL = `http://${process.env.REACT_APP_GQL_SERVER_URL}`;

export const SPOTIFY_AUTH = `/auth/spotify/token`;
export const FACEBOOK_AUTH = `/auth/facebook/token?access_token=`;
export const GOOGLE_AUTH = `/auth/google/token?access_token=`;
export const LOCAL_AUTH = `/auth/login`;
export const LOCAL_REGISTER = `/auth/signup`;
export const LOCAL_PW_CHANGE = `/auth/change-password`;
