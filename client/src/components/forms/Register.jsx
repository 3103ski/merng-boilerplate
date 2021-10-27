import React, { useContext } from 'react';

import axios from 'axios';
import { Form, Button } from 'semantic-ui-react';

import { useForm } from '../../hooks';
import { SERVER_URL } from '../../config';
import { AuthContext } from '../../contexts/auth';
import { Loader } from '../../components/';
import { GoogleLoginButton } from './oAuthButtons/';

export default function RegisterUserForm({ history, callback }) {
	const { isLoading, authStart, authSuccess, authError } = useContext(AuthContext);

	const { values, onSubmit, onChange } = useForm(registerUser, {
		email: '',
		password: '',
		confirmPassword: '',
	});

	async function registerUser() {
		console.log('fired');
		await authStart();
		axios
			.post(
				SERVER_URL + '/auth/signup',
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
				console.log('the call came back', res);
				authSuccess(res.data.token, res.data.user._id);
				return history.push('/user-dash');
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
			</Form>
		</>
	);
}
