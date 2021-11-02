//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import React, { useContext } from 'react';
//~~ React & Hooks
import { useForm } from '../../../hooks';

//~~ Package Imports
import { Button } from 'semantic-ui-react';

//~~ Local App Components
import { RenderBasicForm } from '../../../components/';
import { GoogleLoginButton, FacebookLoginButton, SpotifyLoginButton } from '../oAuthButtons/';

//~~ Variables + Contexts
import { AuthContext } from '../../../contexts/auth';
import { LOCAL_AUTH } from '../../../routes';
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const inputs = [
	{ name: 'email', type: 'email', placeholder: 'Email' },
	{ name: 'password', type: 'password', placeholder: 'Password' },
];

export default function LoginForm({ history }) {
	// form uses authRegisterApi and not GQL query
	const { isLoading, authRegisterApi, errors, clearErrors, authError } = useContext(AuthContext);

	/** setup useForm hook */
	const { values, onSubmit, onChange, emptyInputErrors } = useForm(loginInit, null, {
		onChangeCB: clearErrors,
		setErrors: authError,
		formArray: inputs, // pass inputs since no initial value
	});

	function loginInit() {
		return authRegisterApi({ authEndpoint: LOCAL_AUTH, data: values }, history);
	}

	return (
		<RenderBasicForm
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
						Login
					</Button>
					<GoogleLoginButton history={history} />
					<SpotifyLoginButton history={history} />
					<FacebookLoginButton history={history} />
				</>
			)}
		/>
	);
}
