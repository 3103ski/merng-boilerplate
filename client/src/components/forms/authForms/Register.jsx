//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import React, { useContext } from 'react';
//~~~ React & Hooks
import { useForm } from '../../../hooks/';

//~~~ Package Imports
import { Form, Button } from 'semantic-ui-react';

//~~~ Local Components
import { Loader } from '../../../components/';
import { GoogleLoginButton, SpotifyLoginButton, FacebookLoginButton } from '../oAuthButtons/';

//~~~ Variables & Contexts
import { AuthContext } from '../../../contexts/auth';
import { LOCAL_REGISTER } from '../../../routes.js';
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export default function RegisterUserForm({ history }) {
	const { isLoading, authRegisterApi } = useContext(AuthContext);

	const {
		values: { email, displayName, password, confirmPassword },
		onSubmit,
		onChange,
	} = useForm(registerUser, {
		email: '',
		displayName: '',
		password: '',
		confirmPassword: '',
	});

	async function registerUser() {
		authRegisterApi(
			{
				authEndpoint: LOCAL_REGISTER,
				data: {
					email,
					displayName,
					password,
					confirmPassword,
				},
			},
			history
		);
	}

	return isLoading ? (
		<Loader loadingText='Registering User' />
	) : (
		<>
			<Form onSubmit={onSubmit}>
				<Form.Input
					type='email'
					onChange={onChange}
					value={email}
					name='email'
					placeholder='Email'
				/>
				<Form.Input
					type='text'
					onChange={onChange}
					value={displayName}
					name='displayName'
					placeholder='Display Name'
				/>
				<Form.Input
					type='password'
					onChange={onChange}
					value={password}
					name='password'
					placeholder='Password'
				/>
				<Form.Input
					type='password'
					onChange={onChange}
					value={confirmPassword}
					name='confirmPassword'
					placeholder='Confirm Password'
				/>

				<Button type='submit' primary>
					Register New User
				</Button>

				{/* oAuth buttons toggle on config.js variable */}
				<GoogleLoginButton history={history} />
				<SpotifyLoginButton history={history} />
				<FacebookLoginButton history={history} />
			</Form>
		</>
	);
}
