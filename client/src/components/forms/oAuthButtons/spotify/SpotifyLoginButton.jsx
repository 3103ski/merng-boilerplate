import React, { useContext } from 'react';

import { SpotifyAuth, Scopes } from 'react-spotify-auth';

import { SPOTIFY_CLIENT_ID, USE_OAUTH } from '../../../../config';
import { AuthContext } from '../../../../contexts/';
import { NO_AUTH_REDIRECT, SPOTIFY_AUTH, BASE_URL } from '../../../../routes.js';

import 'react-spotify-auth/dist/index.css';
import * as style from '../oAuthButtons.module.scss';

export default function SpotifyLoginButton({ history }) {
	const { authRegisterApi } = useContext(AuthContext);

	const spotifyAuthInit = async (token) => {
		authRegisterApi({ authEndpoint: SPOTIFY_AUTH, data: { token } }, history);
	};

	return USE_OAUTH.spotify ? (
		<SpotifyAuth
			clientID={SPOTIFY_CLIENT_ID}
			onAccessToken={spotifyAuthInit}
			redirectUri={`${BASE_URL}${NO_AUTH_REDIRECT}`}
			scopes={[Scopes.userReadPrivate, Scopes.userReadEmail]}
			title='Login With Spotify'
			btnClassName={`${style.SpotifyBtn} ${style.OAuthBtn}`}
		/>
	) : null;
}
