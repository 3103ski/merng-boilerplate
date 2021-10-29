//~~~
import React, { useContext } from 'react';
//~~~
import GoogleLogin from 'react-google-login';
import icon from './google.png';
//~~~
import { GOOGLE_CLIENT_ID, USE_OAUTH } from '../../../../config';
import { GOOGLE_AUTH } from '../../../../routes.js';
import { AuthContext } from '../../../../contexts/';
//~~~
import * as style from '../oAuthButtons.module.scss';
//~~~

export default function GoogleAuthButton({ history }) {
	const { authRegisterApi } = useContext(AuthContext);

	const googleResponseCallback = ({ tokenId }) => {
		const authEndpoint = GOOGLE_AUTH + tokenId;
		return authRegisterApi({ authEndpoint, method: 'get' }, history);
	};

	return USE_OAUTH.google ? (
		<GoogleLogin
			clientId={GOOGLE_CLIENT_ID}
			render={(renderProps) => (
				<button
					className={`${style.GoogleBtn} ${style.OAuthBtn}`}
					onClick={renderProps.onClick}>
					<img src={icon} alt='google logo' />
					<span>Login With Google</span>
				</button>
			)}
			onSuccess={googleResponseCallback}
			onFailure={googleResponseCallback}
		/>
	) : null;
}
