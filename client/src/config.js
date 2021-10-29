//•••••••••
// GLOBAL
//•••••••••
export const TOKEN_TITLE = process.env.REACT_APP_TOKEN_TITLE || 'jwtToken';

//••••••••••••••
// oAuth Creds
//••••••••••••••
export const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
export const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID;
export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

//•••••••••••••••••
// UI Preferences
//•••••••••••••••••
//**** Basic styling options available in '/client/sass/variables' */

export const USE_OAUTH = {
	google: true,
	facebook: false,
	spotify: true,
};
