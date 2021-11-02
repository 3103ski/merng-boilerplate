//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import React, { useContext } from 'react';
//~~~ React & Hooks
import { useForm } from '../../../hooks/';

//~~~ Package Imports
import { Button } from 'semantic-ui-react';

//~~~ Local Components
import { RenderBasicForm } from '../../../components/';
import { GoogleLoginButton, SpotifyLoginButton, FacebookLoginButton } from '../oAuthButtons/';

//~~~ Variables & Contexts
import { AuthContext } from '../../../contexts/auth';
import { LOCAL_REGISTER } from '../../../routes.js';
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const formID = 'form_update_user_profile';
const inputs = [
	{ name: 'email', type: 'email', placeholder: 'Email' },
	{ name: 'displayName', type: 'text', placeholder: 'Display Name' },
	{ name: 'password', type: 'password', placeholder: 'Password' },
	{ name: 'confirmPassword', type: 'password', placeholder: 'Confirm Password' },
];

export default function RegisterUserForm({ history }) {
	const { isLoading, authRegisterApi, errors, clearErrors, authError } = useContext(AuthContext);

	const { values, onSubmit, onChange, emptyInputErrors } = useForm(registerUser, null, {
		onChangeCB: clearErrors,
		setErrors: authError,
		formArray: inputs,
	});

	function registerUser() {
		authRegisterApi(
			{
				authEndpoint: LOCAL_REGISTER,
				data: values,
			},
			history
		);
	}

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
					<Button type='submit' primary>
						Sign Up!
					</Button>

					<GoogleLoginButton history={history} />
					<SpotifyLoginButton history={history} />
					<FacebookLoginButton history={history} />
				</>
			)}
		/>
	);
}
