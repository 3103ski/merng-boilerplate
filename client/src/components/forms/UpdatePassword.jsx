import React, { useContext } from 'react';

import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { useForm } from '../../util/hooks';
import { AuthContext } from '../../context/auth';
import { Loader } from '../../components/';

export default function UpdateUserPasswordForm({ callback }) {
	const authContext = useContext(AuthContext);

	const { values, onSubmit, onChange } = useForm(updatePasswordHandler, {
		password: '',
		newPassword: '',
		confirmNewPassword: '',
	});

	const [updateUserPassword, { loading }] = useMutation(UPDATE_PASSWORD, {
		update(_, { data: { updatePassword: userData } }) {
			console.log('wus dis?? ', userData);
			authContext.login(userData);

			if (callback) callback();
		},
		variables: values,
	});

	function updatePasswordHandler() {
		updateUserPassword();
	}

	return loading ? (
		<Loader loadingText='Updating Password' />
	) : (
		<Form onSubmit={onSubmit}>
			<Form.Input
				type='password'
				onChange={onChange}
				value={values.password}
				name='password'
				placeholder='Current Password'
			/>
			<Form.Input
				type='password'
				onChange={onChange}
				value={values.newPassword}
				name='newPassword'
				placeholder='New Password'
			/>
			<Form.Input
				type='password'
				onChange={onChange}
				value={values.confirmNewPassword}
				name='confirmNewPassword'
				placeholder='Confirm New Password'
			/>
			<Button onClick={callback}>Cancel</Button>
			<Button onClick={updateUserPassword} type='submit' primary>
				Update Password
			</Button>
		</Form>
	);
}

const UPDATE_PASSWORD = gql`
	mutation updatePassword(
		$password: String!
		$newPassword: String!
		$confirmNewPassword: String!
	) {
		updatePassword(
			updatePasswordInput: {
				password: $password
				newPassword: $newPassword
				confirmNewPassword: $confirmNewPassword
			}
		) {
			id
			email
			username
			token
			createdAt
		}
	}
`;
