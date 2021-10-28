import React, { useState, useEffect, useCallback } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

import { FACEBOOK_APP_ID } from '../../../../config.js';
import { LOGIN_SUCCES_REDIRECT, SERVER_URL, FACEBOOK_AUTH } from '../../../../routes.js';
import icon from './facebook.png';
import * as style from '../oAuthButtons.module.scss';

export default function FacebookLoginBtn({ authStart, authSuccess, authError, history }) {
	const [authInfo, setAuthInfo] = useState(null);
	const responseFacebook = (response) =>
		response.accessToken ? setAuthInfo(response) : console.log('There was an error');
	const Icon = () => <img src={icon} alt='fb login' />;

	const facebookAuthInit = useCallback(
		async ({ accessToken }) => {
			await authStart();

			return axios
				.get(SERVER_URL + FACEBOOK_AUTH + accessToken)
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
		if (authInfo !== null) {
			facebookAuthInit(authInfo);
		}
	}, [authInfo, facebookAuthInit]);

	return (
		<FacebookLogin
			appId={FACEBOOK_APP_ID}
			autoLoad={false}
			fields='name,email,picture,givenName,familyName'
			cssClass={`${style.FacebookBtn} ${style.OAuthBtn}`}
			icon={<Icon />}
			textButton='Login With Facebook'
			callback={responseFacebook}
		/>
	);
}
