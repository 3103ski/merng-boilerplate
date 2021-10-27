import axios from 'axios';
import { Button } from 'semantic-ui-react';
import GoogleLogin from 'react-google-login';

import { SERVER_URL } from '../../../../config';

export default function GoogleAuthButton({ authStart, authSuccess, authError, history }) {
	const responseGoogle = (response) => {
		authStart();
		const url = SERVER_URL + '/auth/google/token?access_token=' + response.tokenId;
		return axios
			.get(url)
			.then(async (res) => {
				if (res.data.success) {
					authSuccess(res.data.token, res.data.user._id);
				}
			})
			.then(() => {
				return history.push('/user-dash');
			})
			.catch((err) => {
				authError(err);
			});
	};

	return (
		<GoogleLogin
			clientId='555560470011-lm5fdsua6hfgtfl83vao6voj7sb9tg3b.apps.googleusercontent.com'
			// className={style.FacebookLoginBtn}
			buttonText='Login'
			render={(renderProps) => (
				<Button onClick={renderProps.onClick}>
					{/* <img src='/assets/icons/google.png' alt='spotify' /> */}
					Google Login
				</Button>
			)}
			onSuccess={responseGoogle}
			onFailure={responseGoogle}
		/>
	);
}
