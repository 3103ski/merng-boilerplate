//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import React, { useContext } from 'react';
//~~ React & Hooks
import { useForm } from '../../../hooks';

//~~ Package Imports
import { Form, Button } from 'semantic-ui-react';

//~~ Local App Components
import { Loader } from '../../../components/';
import { GoogleLoginButton, FacebookLoginButton, SpotifyLoginButton } from '../oAuthButtons/';

//~~ Variables + Contexts
import { AuthContext } from '../../../contexts/auth';
import { LOCAL_AUTH } from '../../../routes';
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export default function LoginForm({ history }) {
	const { isLoading, authRegisterApi } = useContext(AuthContext);
	const {
		values: { email, password },
		onSubmit,
		onChange,
	} = useForm(loginInit, {
		email: '',
		password: '',
	});

	function loginInit() {
		authRegisterApi({ authEndpoint: LOCAL_AUTH, data: { email, password } }, history);
	}

	return (
		<>
			<Form onSubmit={onSubmit}>
				{isLoading ? <Loader loadingText='Logging In' /> : null}
				<Form.Input
					type='email'
					onChange={onChange}
					value={email}
					name='email'
					placeholder='Email'
				/>
				<Form.Input
					type='password'
					onChange={onChange}
					value={password}
					name='password'
					placeholder='Password'
				/>
				<Button type='submit' primary>
					Login
				</Button>
				<GoogleLoginButton history={history} />
				<SpotifyLoginButton history={history} />
				<FacebookLoginButton history={history} />
			</Form>
			{/* <FormErrors errors={errors} /> */}
		</>
	);
}
