import React, { useContext } from 'react';

import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
// import gql from 'graphql-tag';

import { useForm, useGQLFormErrors } from '../../hooks';
import { AuthContext } from '../../context/auth';
import { Loader, FormErrors } from '../../components';
import { LOGIN_USER } from '../../gql/';

export default function LoginForm({ history, callback }) {
	const { loginSuccess } = useContext(AuthContext);

	const { errors, setFormError, clearErrors } = useGQLFormErrors();
	const { values, onSubmit, onChange } = useForm(loginUser, {
		email: '',
		password: '',
	});

	const [login, { loading }] = useMutation(LOGIN_USER, {
		update(_, { data: { login: userData } }) {
			loginSuccess(userData);

			if (callback) callback();
			if (history) history.push('/user-dash');
		},
		onError(err) {
			setFormError(err);
		},
		variables: values,
	});

	async function loginUser() {
		await clearErrors();
		login();
	}

	return (
		<>
			<Form onSubmit={onSubmit}>
				{loading ? (
					<Loader loadingText='Logging In' />
				) : (
					<>
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
					</>
				)}
				<Button type='submit' primary loading={loading}>
					Login
				</Button>
			</Form>
			<FormErrors errors={errors} />
		</>
	);
}
