//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import React, { useEffect, useContext } from 'react';
//~~~  React & Hooks
import { useForm } from '../../../hooks';

//~~~  Other Package Imports
import { Button } from 'semantic-ui-react';

//~~~  Local Components
import { RenderBasicForm } from '../../../components/';

//~~~  Variables, Contexts, & Helpers
import { AuthContext } from '../../../contexts/';
import { LOCAL_PW_CHANGE } from '../../../routes.js';
import { handleOnEnter } from '../../../util/helperFunctions.js';
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const formID = 'form_update_user_password';
const inputs = [
	{ name: 'password', type: 'password', placeholder: 'Password' },
	{ name: 'newPassword', type: 'password', placeholder: 'New Password' },
	{ name: 'confirmNewPassword', type: 'password', placeholder: 'Confirm New Password' },
];

export default function UpdateUserPasswordForm({ callback, userEmail }) {
	// Setup error control and form actions
	const { isLoading, token, authRegisterApi, errors, setErrors, clearErrors } = useContext(AuthContext);

	// Setup useForm hook; no initial state so initial state
	// gets 'null' and options object gets 'inputs' as 'formArray'
	const { values, onSubmit, onChange, emptyInputErrors } = useForm(updatePassword, null, {
		onChangeCB: clearErrors,
		formArray: inputs,
		setErrors,
	});

	// Form handler
	function updatePassword() {
		if (token && userEmail) {
			authRegisterApi(
				{
					authEndpoint: LOCAL_PW_CHANGE,
					data: {
						email: userEmail,
						...values,
					},
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
				null,
				() => {
					window.alert('password updated');
					callback();
				}
			);
		}
	}

	// Form is inside modal, mount listener for enter (modal bug; maybe SemUI Modal)
	const updatePasswordOnEnterHandler = (e) => handleOnEnter(e, updatePassword);
	useEffect(() => {
		const form = document.getElementById(formID);
		form.addEventListener('keydown', updatePasswordOnEnterHandler);
		return () => form.removeEventListener('keydown', updatePasswordOnEnterHandler);
	});

	return (
		<RenderBasicForm
			id={formID}
			inputs={inputs}
			values={values}
			onChange={onChange}
			onSubmit={onSubmit}
			isLoading={isLoading}
			emptyInputErrors={emptyInputErrors}
			errors={errors}
			buttons={() => (
				<>
					<Button onClick={callback}>Cancel</Button>
					<Button onClick={updatePassword} type='submit' primary>
						Update Password
					</Button>
				</>
			)}
		/>
	);
}
