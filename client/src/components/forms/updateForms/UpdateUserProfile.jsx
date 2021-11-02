//~~~  React & Hooks
import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useForm, useGQLFormErrors } from '../../../hooks';

//~~~  Other Package Imports
import { Button } from 'semantic-ui-react';

//~~~  Local Components
import { RenderBasicForm } from '../../../components/';

//~~~  Variables & Helpers
import { UPDATE_USER } from '../../../gql';
import { handleOnEnter } from '../../../util/helperFunctions.js';

/**
 *
 *      callback :: optional ::  fires on success ; intended to close modal
 *      user     :: REQUIRED ::  provides initial values to update
 *
 */

const formID = 'form_update_user_profile';
const inputs = [{ name: 'displayName', type: 'text', placeholder: 'Display Name' }];

export default function UpdateUserProfile({ callback, user }) {
	if (!user) throw new Error('Update user form requires a valid "user" arg');

	/** Form uses GQL, so setup useGQLFormErrors hook */
	const { errors, setFormError, clearErrors } = useGQLFormErrors();

	/** Setup useForm hook; since it is an update form, pass initial state */
	const { values, onSubmit, onChange, emptyInputErrors } = useForm(
		updateUserProfileHandler,
		{
			displayName: user.displayName,
		},
		{ onChangeCB: clearErrors, setErrors: setFormError }
	);

	const [updateUser, { loading }] = useMutation(UPDATE_USER, {
		update(_, { data: { updateUser: updatedUser } }) {
			if (callback) callback();
		},
		onError(err) {
			setFormError(err);
		},
		variables: values,
	});

	async function updateUserProfileHandler() {
		await clearErrors();
		if (emptyInputErrors.length > 0) return setFormError({ [emptyInputErrors[0]]: `Missing fields` });
		return updateUser();
	}

	useEffect(() => {
		const form = document.getElementById(formID);
		const updateOnEnterHandler = (e) => handleOnEnter(e, updateUserProfileHandler);
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
