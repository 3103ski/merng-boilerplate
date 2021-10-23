import React, { useContext } from 'react';

import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { useForm } from '../../util/hooks';
import { AuthContext } from '../../context/auth';
import { Loader } from '../../components';

export default function LoginForm({ history }) {
	const authContext = useContext(AuthContext);

	const { values, onSubmit, onChange } = useForm(loginUser, {
		email: '',
		password: '',
	});

	const [login, { loading }] = useMutation(LOGIN_USER, {
		update(_, { data: { login: userData } }) {
			authContext.login(userData);
			history.push('/user-dash');
		},
		variables: values,
	});

	function loginUser() {
		login();
	}

	return (
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
	);
}

const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(loginInput: { email: $email, password: $password }) {
			id
			email
			username
			token
			createdAt
		}
	}
`;
