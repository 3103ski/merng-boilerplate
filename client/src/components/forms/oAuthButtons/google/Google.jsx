import axios from 'axios';
import GoogleLogin from 'react-google-login';
import icon from './google.png';

import { GOOGLE_CLIENT_ID, USE_OAUTH } from '../../../../config';
import { SERVER_URL, GOOGLE_AUTH, LOGIN_SUCCES_REDIRECT } from '../../../../routes.js';
import * as style from '../oAuthButtons.module.scss';

export default function GoogleAuthButton({ authStart, authSuccess, authError, history }) {
	const googleResponseCallback = async ({ tokenId }) => {
		await authStart();

		return axios
			.get(SERVER_URL + GOOGLE_AUTH + tokenId)
			.then(async (res) => {
				if (res.data.success) {
					authSuccess(res.data.token, res.data.user._id);
				}
			})
			.then(() => {
				return history.push(LOGIN_SUCCES_REDIRECT);
			})
			.catch((err) => {
				authError(err);
			});
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
