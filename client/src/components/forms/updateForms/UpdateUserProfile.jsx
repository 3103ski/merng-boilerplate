//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import React, { useEffect } from 'react';
//~~~  React & Hooks
import { useMutation } from '@apollo/client';
import { useForm, useGQLFormErrors } from '../../../hooks';

//~~~  Other Package Imports
import { Form, Button } from 'semantic-ui-react';

//~~~  Local Components
import { Loader, GQLFormErrors } from '../..';

//~~~  Variables & Helpers
import { UPDATE_USER } from '../../../gql';
import { handleOnEnter } from '../../../util/helperFunctions.js';
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 *
 *      callback :: optional ::  fires on success ; intended to close modal
 *      user     :: REQUIRED ::  provides initial values to update
 *
 */

export default function UpdateUserProfile({ callback, user }) {
	if (!user) throw new Error('Update user form requires a valid "user" arg');

	const {
		values: { displayName },
		onSubmit,
		onChange,
	} = useForm(updateUserProfileHandler, {
		displayName: user.displayName,
	});

	const { errors, setFormError, clearErrors } = useGQLFormErrors();

	const [updateUser, { loading }] = useMutation(UPDATE_USER, {
		update(_, { data: { updateUser: updatedUser } }) {
			if (callback) callback();
		},
		onError(err) {
			setFormError(err);
		},
		variables: { displayName },
	});

	async function updateUserProfileHandler() {
		await clearErrors();
		return updateUser();
	}

	useEffect(() => {
		/**
		 * 	for whatever reason, the submit callback doesn't fire on enter
		 * 	when the form exists inside of semantic UI modal component.
		 */

		const form = document.getElementById('form_update_user_profile');
		const updateOnEnterHandler = (e) => handleOnEnter(e, updateUserProfileHandler);

		form.addEventListener('keydown', updateOnEnterHandler);
		return () => form.removeEventListener('keydown', updateOnEnterHandler);
	});

	return (
		<>
			<Form id='form_update_user_profile' onSubmit={onSubmit}>
				{loading ? (
					<Loader loadingText='Updating Profile' />
				) : (
					<>
						<Form.Input
							type='displayName'
							onChange={onChange}
							value={displayName}
							name='displayName'
							placeholder='Add Display Name'
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
