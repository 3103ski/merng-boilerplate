import React, { useContext } from 'react';

import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { useForm, useGQLFormErrors } from '../../hooks';
import { AuthContext } from '../../context/auth';
import { Loader, FormErrors } from '../../components/';
import { REGISTER_USER } from '../../gql/';

export default function RegisterUserForm({ history, callback }) {
	const { loginSuccess } = useContext(AuthContext);

	const { errors, setFormError, clearErrors } = useGQLFormErrors();
	const { values, onSubmit, onChange } = useForm(registerUser, {
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(_, { data: { register: userData } }) {
			loginSuccess(userData);

			if (callback) callback();
			if (history) history.push('/user-dash');
		},
		onError(err) {
			setFormError(err);
		},
		variables: values,
	});

	function registerUser() {
		clearErrors();
		addUser();
	}

	return loading ? (
		<Loader loadingText='Registering User' />
	) : (
		<>
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
			<FormErrors errors={errors} />
		</>
	);
}
