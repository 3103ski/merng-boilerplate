import axios from 'axios';
import { LOGIN_SUCCES_REDIRECT, NO_AUTH_REDIRECT, SERVER_URL } from '../routes.js';

export default async function useAuthApi(authType, start, succeed, fail, body, history) {
	await start();

	const headers = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	return axios
		.post(SERVER_URL + authType, body, headers)
		.then((res) => {
			if (res.data.success) {
				succeed(res.data.token, res.data.user._id);
				return history.push(LOGIN_SUCCES_REDIRECT);
			}
		})
		.catch((err) => {
			fail(err);
			return history.push(NO_AUTH_REDIRECT);
		});
}
