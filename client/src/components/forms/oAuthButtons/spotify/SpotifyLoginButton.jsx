import React, { useState, useEffect, useCallback } from 'react';

import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import axios from 'axios';

import { SPOTIFY_CLIENT_ID, USE_OAUTH } from '../../../../config';
import {
	NO_AUTH_REDIRECT,
	LOGIN_SUCCES_REDIRECT,
	SPOTIFY_AUTH,
	BASE_URL,
	SERVER_URL,
} from '../../../../routes.js';

import 'react-spotify-auth/dist/index.css';
import * as style from '../oAuthButtons.module.scss';

export default function SpotifyLoginButton({ authStart, authSuccess, authError, history }) {
	const [spotifyToken, setSpotifyToken] = useState(null);

	const spotifyAuthInit = useCallback(
		async (token) => {
			await authStart();

			return axios
				.post(
					SERVER_URL + SPOTIFY_AUTH,
					{ token },
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)
				.then((res) => {
					if (res.data.success) {
						authSuccess(res.data.token, res.data.user._id);
						return history.push(LOGIN_SUCCES_REDIRECT);
					}
				})
				.catch((err) => {
					authError(err);
				});
		},
		[authError, authStart, authSuccess, history]
	);

	useEffect(() => {
		if (spotifyToken) {
			spotifyAuthInit(spotifyToken);
		}
	}, [spotifyToken, spotifyAuthInit]);

	return USE_OAUTH.spotify ? (
		<SpotifyAuth
			clientID={SPOTIFY_CLIENT_ID}
			onAccessToken={(token) => setSpotifyToken(token)}
			redirectUri={`${BASE_URL}${NO_AUTH_REDIRECT}`}
			scopes={[Scopes.userReadPrivate, Scopes.userReadEmail]}
			title='Login With Spotify'
			btnClassName={`${style.SpotifyBtn} ${style.OAuthBtn}`}
		/>
	) : null;
}
