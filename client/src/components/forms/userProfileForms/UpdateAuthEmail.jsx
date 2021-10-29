//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import React, { useEffect } from 'react';
//~~~  React & Hooks
import { useMutation } from '@apollo/client';
import { useForm, useGQLFormErrors } from '../../../hooks';

//~~~  Other Package Imports
import { Form, Button } from 'semantic-ui-react';

//~~~  Local Components
import { Loader, GQLFormErrors } from '../../../components/';

//~~~  Variables & Helpers
import { UPDATE_USER } from '../../../gql/';
import { handleOnEnter } from '../../../util/helperFunctions.js';
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export default function UpdateUserInfoForm({ callback, user }) {
	const { values, onSubmit, onChange } = useForm(updateUserInfoHandler, {
		email: user.email,
	});

	const { errors, setFormError, clearErrors } = useGQLFormErrors();

	const [updateUser, { loading }] = useMutation(UPDATE_USER, {
		update(_, { data: { updateUser: userData } }) {
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
			<GQLFormErrors errors={errors} />
		</>
	);
}
