import React, { useContext } from 'react';

import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';

import { useForm } from '../../hooks';
import { AuthContext } from '../../contexts/auth';
import { Loader, Button as CustomButton } from '../../components';
import { GoogleLoginButton } from './oAuthButtons/';
import { SERVER_URL } from '../../config';

export default function LoginForm({ history, callback }) {
	const { isLoading, authStart, authSuccess, authError } = useContext(AuthContext);
	const { values, onSubmit, onChange } = useForm(loginInit, {
		email: '',
		password: '',
	});

	async function loginInit() {
		await authStart();

		axios
			.post(
				SERVER_URL + '/auth/login',
				{
					email: values.email,
					password: values.password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			.then((res) => {
				authSuccess(res.data.token, res.data.user._id);
				return history.push('/user-dash');
			})
			.catch((err) => {
				authError(err);
			});
	}

	return (
		<>
			<Form onSubmit={onSubmit}>
				{isLoading ? <Loader loadingText='Logging In' /> : null}
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
				<Button type='submit' primary loading={isLoading}>
					Login
				</Button>
				<GoogleLoginButton
					authStart={authStart}
					authSuccess={authSuccess}
					authError={authError}
					history={history}
				/>
			</Form>
			{/* <FormErrors errors={errors} /> */}
		</>
	);
}
