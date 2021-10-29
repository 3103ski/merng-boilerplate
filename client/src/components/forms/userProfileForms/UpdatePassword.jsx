//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import React, { useEffect, useState, useContext } from 'react';
//~~~  React & Hooks
import { useQuery } from '@apollo/client';
import { useForm } from '../../../hooks';

//~~~  Other Package Imports
import axios from 'axios';
import { Form, Button } from 'semantic-ui-react';

//~~~  Local Components
import { Loader } from '../../../components/';

//~~~  Variables, Contexts, & Helpers
import { GET_USER } from '../../../gql/';
import { AuthContext } from '../../../contexts/';
import { SERVER_URL, LOCAL_PW_CHANGE } from '../../../routes.js';
import { handleOnEnter } from '../../../util/helperFunctions.js';
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export default function UpdateUserPasswordForm({ callback }) {
	const [isLoading, setIsLoading] = useState(false);
	const { token, userId } = useContext(AuthContext);
	const { values, onSubmit, onChange } = useForm(updatePassword, {
		password: '',
		newPassword: '',
		confirmNewPassword: '',
	});

	const { data } = useQuery(GET_USER, {
		variables: {
			userId,
		},
	});

	async function updatePassword() {
		if (token && data.getUser) {
			setIsLoading(true);
			axios
				.post(
					SERVER_URL + LOCAL_PW_CHANGE,
					{
						email: data.getUser.email,
						password: values.password,
						newPassword: values.newPassword,
						confirmNewPassword: values.confirmNewPassword,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				.then((res) => {
					setIsLoading(false);
					callback();
				})
				.then(() => window.alert('Password Updated!'))
				.catch((err) => {
					setIsLoading(false);
					window.alert('Something went wrong');
				});
		}
	}

	const updatePasswordOnEnterHandler = (e) => handleOnEnter(e, updatePassword);

	useEffect(() => {
		const form = document.getElementById('form_update_password');
		form.addEventListener('keydown', updatePasswordOnEnterHandler);
		return () => form.removeEventListener('keydown', updatePasswordOnEnterHandler);
	});

	return (
		<>
			<Form id='form_update_password' onSubmit={onSubmit}>
				{isLoading ? (
					<Loader loadingText='Updating Password' />
				) : (
					<>
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
					</>
				)}
				<Button onClick={callback}>Cancel</Button>
				<Button onClick={updatePassword} type='submit' primary>
					Update Password
				</Button>
			</Form>
		</>
	);
}
