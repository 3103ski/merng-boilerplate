import React, { useEffect } from 'react';
//~~~  React & Hooks
import { useMutation } from '@apollo/client';
import { useForm, useGQLFormErrors } from '../../../hooks';

//~~~  Other Package Imports
import { Button } from 'semantic-ui-react';

//~~~  Local Components
import { RenderBasicForm } from '../../../components/';

//~~~  Variables & Helpers
import { UPDATE_USER } from '../../../gql';
import { handleOnEnter } from '../../../util/helperFunctions.js';

const formID = 'form_update_user_email';
const inputs = [{ name: 'email', type: 'email', placeholder: 'Enter an email address' }];

export default function UpdateAuthEmail({ callback, user }) {
	const { errors, setFormError, clearErrors } = useGQLFormErrors();

	const { values, onSubmit, onChange, emptyInputErrors } = useForm(
		updateUserInfoHandler,
		{
			email: user.email,
		},
		{ onChangeCB: clearErrors, setErrors: setFormError }
	);

	const [updateUser, { loading }] = useMutation(UPDATE_USER, {
		update(_, { data: { updateUser: userData } }) {
			if (callback) callback();
		},
		onError(err) {
			setFormError(err);
		},
		variables: values,
	});

	function updateUserInfoHandler() {
		clearErrors();
		if (emptyInputErrors.length > 0) return setFormError({ [emptyInputErrors[0]]: `Missing fields` });
		return updateUser();
	}

	const updateOnEnterHandler = (e) => handleOnEnter(e, updateUserInfoHandler);

	useEffect(() => {
		const form = document.getElementById(formID);
		form.addEventListener('keydown', updateOnEnterHandler);
		return () => form.removeEventListener('keydown', updateOnEnterHandler);
	});

	return (
		<RenderBasicForm
			id={formID}
			inputs={inputs}
			values={values}
			onChange={onChange}
			onSubmit={onSubmit}
			isLoading={loading}
			emptyInputErrors={emptyInputErrors}
			errors={errors}
			buttons={() => (
				<>
					<Button onClick={callback}>Cancel</Button>
					<Button type='submit' primary>
						Update
					</Button>
				</>
			)}
		/>
	);
}
