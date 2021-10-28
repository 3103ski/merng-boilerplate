import React, { useContext } from 'react';

import axios from 'axios';
import { Form, Button } from 'semantic-ui-react';

import { Loader } from '../../components/';
import { GoogleLoginButton, SpotifyLoginButton, FacebookLoginButton } from './oAuthButtons/';

import { useForm } from '../../hooks';
import { AuthContext } from '../../contexts/auth';
import { SERVER_URL, LOCAL_REGISTER, LOGIN_SUCCES_REDIRECT } from '../../routes.js';

export default function RegisterUserForm({ history }) {
	const { isLoading, authStart, authSuccess, authError } = useContext(AuthContext);

	const { values, onSubmit, onChange } = useForm(registerUser, {
		email: '',
		password: '',
		confirmPassword: '',
	});

	async function registerUser() {
		await authStart();
		axios
			.post(
				SERVER_URL + LOCAL_REGISTER,
				{
					email: values.email,
					password: values.password,
					confirmPassword: values.confirmPassword,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			.then((res) => {
				authSuccess(res.data.token, res.data.user._id);
				return history.push(LOGIN_SUCCES_REDIRECT);
			})
			.catch((err) => {
				authError(err);
			});
	}

	return isLoading ? (
		<Loader loadingText='Registering User' />
	) : (
		<>
			<Form onSubmit={onSubmit}>
				<Form.Input
					type='email'
					onChange={onChange}
					value={values.email}
					name='email'
					placeholder='Email'
				/>
				<Form.Input
					type='password'
					onChange={onChange}
					value={values.password}
					name='password'
					placeholder='Password'
				/>
				<Form.Input
					type='password'
					onChange={onChange}
					value={values.confirmPassword}
					name='confirmPassword'
					placeholder='Confirm Password'
				/>
				<Button type='submit' primary>
					Register New User
				</Button>
				<GoogleLoginButton
					authStart={authStart}
					authSuccess={authSuccess}
					authError={authError}
					history={history}
				/>
				<SpotifyLoginButton
					authStart={authStart}
					authSuccess={authSuccess}
					authError={authError}
					history={history}
				/>
				<FacebookLoginButton
					authStart={authStart}
					authSuccess={authSuccess}
					authError={authError}
					history={history}
				/>
			</Form>
		</>
	);
}
