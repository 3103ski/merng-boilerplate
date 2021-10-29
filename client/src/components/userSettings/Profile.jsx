import React, { useState } from 'react';

import { Button, Grid } from 'semantic-ui-react';

import {
	BasicCard,
	FormModal,
	UpdatePasswordForm,
	UpdateUserInfoForm,
	Loader,
} from '../../../components/';

export default function ProfileSettings({ loading, user }) {
	const [isUpdatingProfile, setIsUpdatingPassword] = useState(false);

	return (
		<>
			<BasicCard centerSelf title={'User Settings'}>
				<Grid>
					<Grid.Column width={16}>
						{loading ? <Loader /> : <p>Display Name: {user.displayName}</p>}
					</Grid.Column>

					<Grid.Column width={9}>
						<Button size='tiny' onClick={() => setIsUpdatingPassword(true)}>
							Edit Profile
						</Button>
					</Grid.Column>
				</Grid>
			</BasicCard>
			<FormModal
				header='Update Password'
				formComponent={UpdatePasswordForm}
				isOpen={isUpdatingProfile}
				setIsOpen={setIsUpdatingPassword}
				size='tiny'
			/>
		</>
	);
}
