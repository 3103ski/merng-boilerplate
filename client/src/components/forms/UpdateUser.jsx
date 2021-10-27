import React, { useContext, useEffect } from 'react';

import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { useForm, useGQLFormErrors } from '../../hooks';
import { AuthContext } from '../../contexts/auth';
import { Loader, FormErrors } from '../../components/';
import { UPDATE_USER } from '../../gql/';
import { GET_USER } from '../../gql/';
import { handleOnEnter } from '../../util/helperFunctions.js';

export default function UpdateUserInfoForm({ callback, user }) {
	const { values, onSubmit, onChange } = useForm(updateUserInfoHandler, {
		email: user.email,
	});

	const { errors, setFormError, clearErrors } = useGQLFormErrors();

	const [updateUser, { loading }] = useMutation(UPDATE_USER, {
		update(cache, { data: { updateUser: userData } }) {
			console.log('cache', cache);
			console.log('user', userData);

			if (callback) callback();
		},
		onError(err) {
			setFormError(err);
		},
		variables: values,
	});

	async function updateUserInfoHandler() {
		await clearErrors();
		updateUser();
	}

	const updateOnEnterHandler = (e) => handleOnEnter(e, updateUserInfoHandler);

	useEffect(() => {
		const form = document.getElementById('form_update_user_info');
		form.addEventListener('keydown', updateOnEnterHandler);
		return () => form.removeEventListener('keydown', updateOnEnterHandler);
	});

	return (
		<>
			<Form id='form_update_user_info' onSubmit={onSubmit}>
				{loading ? (
					<Loader loadingText='Updating Info' />
				) : (
					<>
						<Form.Input
							type='email'
							onChange={onChange}
							value={values.email}
							name='email'
							placeholder='Enter Email'
						/>
					</>
				)}
				<Button onClick={callback}>Cancel</Button>
				<Button type='submit' primary>
					Update
				</Button>
			</Form>
			<FormErrors errors={errors} />
		</>
	);
}
