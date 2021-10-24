import React, { useContext, useEffect } from 'react';

import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { useForm, useGQLFormErrors } from '../../hooks';
import { AuthContext } from '../../context/auth';
import { Loader, FormErrors } from '../../components/';
import { UPDATE_PASSWORD } from '../../gql/';
import { handleOnEnter } from '../../util/helperFunctions.js';

export default function UpdateUserPasswordForm({ callback }) {
	const authContext = useContext(AuthContext);

	const { values, onSubmit, onChange } = useForm(updatePasswordHandler, {
		password: '',
		newPassword: '',
		confirmNewPassword: '',
	});

	const { errors, setFormError, clearErrors } = useGQLFormErrors();

	const [updateUserPassword, { loading }] = useMutation(UPDATE_PASSWORD, {
		update(_, { data: { updatePassword: userData } }) {
			authContext.login(userData);

			if (callback) callback();
		},
		onError(err) {
			setFormError(err);
		},
		variables: values,
	});

	function updatePasswordHandler() {
		clearErrors();
		updateUserPassword();
	}

	const updatePasswordEnter = (e) => handleOnEnter(e, updatePasswordHandler);

	useEffect(() => {
		const form = document.getElementById('form_update_password');
		form.addEventListener('keydown', updatePasswordEnter);
		return () => form.removeEventListener('keydown', updatePasswordEnter);
	});

	return (
		<>
			<Form id='form_update_password' onSubmit={onSubmit}>
				{loading ? (
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
				<Button onClick={updateUserPassword} type='submit' primary>
					Update Password
				</Button>
			</Form>
			<FormErrors errors={errors} />
		</>
	);
}
