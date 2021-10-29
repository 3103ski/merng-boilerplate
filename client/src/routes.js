/**
 *			!IMPORTANT :: This starter will not work as is
 *			without creating .env file in the /client/
 *			directory that follows the starter template 

 *			See readMe.md for more info on
 *			gathering credentials. 

 *          See '/client/src/config.js'
 *			for ~~TEMPLATE~~. 
 */

//•••••••••••••••••••••••••••••••••••
// ••••••••  CLIENT URLS  •••••••••••
//•••••••••••••••••••••••••••••••••••

export const BASE_URL = `http://${process.env.REACT_APP_BASE_URL}`;

/**
 * ---->  BASE ROUTES
 */

export const LANDING = `/`;
export const LOGIN = `/login`;
export const REGISTER = `/register`;
export const DASHBOARD = `/dashboard`;
export const USER_SETTINGS = `/settings`;

/**
 * ---->  SUB ROUTES
 */

// User Settings
export const SETTINGS_PROFILE = `/edit-profile`;
export const SETTINGS_LOGIN_INFO = `/login-info`;

/**
 * ---->  REDIRECTS
 */
export const LOGIN_SUCCES_REDIRECT = DASHBOARD;
export const NO_AUTH_REDIRECT = LOGIN;

//•••••••••••••••••••••••••••••••••••
// ••••••••  SERVER URLS  •••••••••••
//•••••••••••••••••••••••••••••••••••

/**
 * ----> API BASE URLS
 */

const authDir = 'auth';
export const SERVER_URL = `http://${process.env.REACT_APP_SERVER_URL}`;
export const GQL_SERVER_URL = `http://${process.env.REACT_APP_GQL_SERVER_URL}`;

/**
 * ----> AUTH ENDPOINTS
 */

export const SPOTIFY_AUTH = `/${authDir}/spotify/token`;
export const FACEBOOK_AUTH = `/${authDir}/facebook/token?access_token=`;
export const GOOGLE_AUTH = `/${authDir}/google/token?access_token=`;
export const LOCAL_AUTH = `/${authDir}/login`;
export const LOCAL_REGISTER = `/${authDir}/signup`;
export const LOCAL_PW_CHANGE = `/${authDir}/change-password`;
