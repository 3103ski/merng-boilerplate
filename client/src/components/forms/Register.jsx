import React, { useContext } from 'react';

import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { useForm } from '../../util/hooks';
import { AuthContext } from '../../context/auth';
import { Loader } from '../../components/';

export default function RegisterUserForm({ history }) {
	const authContext = useContext(AuthContext);

	const { values, onSubmit, onChange } = useForm(registerUser, {
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(_, { data: { register: userData } }) {
			authContext.login(userData);
			history.push('/user-dash');
		},
		variables: values,
	});

	function registerUser() {
		addUser();
	}

	return loading ? (
		<Loader loadingText='Registering User' />
	) : (
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
		</Form>
	);
}

const REGISTER_USER = gql`
	mutation register($email: String!, $password: String!, $confirmPassword: String!) {
		register(
			registerInput: { email: $email, password: $password, confirmPassword: $confirmPassword }
		) {
			id
			email
			username
			token
			createdAt
		}
	}
`;
