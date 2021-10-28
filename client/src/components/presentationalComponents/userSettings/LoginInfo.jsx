import React, { useState } from 'react';

import { Button, Grid } from 'semantic-ui-react';

import {
	BasicCard,
	FormModal,
	UpdatePasswordForm,
	UpdateUserInfoForm,
	Loader,
} from '../../../components/';

export default function LoginInfoTab({ loading, user }) {
	const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
	const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);

	return (
		<>
			<BasicCard centerSelf title={'User Settings'}>
				<Grid>
					<Grid.Column width={16}>
						{loading ? <Loader /> : <p>Email Address: {user.email}</p>}
					</Grid.Column>

					<Grid.Column width={9}>
						<Button size='tiny' onClick={() => setIsUpdatingPassword(true)}>
							Change Password
						</Button>
					</Grid.Column>
					<Grid.Column width={7}>
						<Button size='tiny' onClick={() => setIsUpdatingInfo(true)} color='teal'>
							Update Info
						</Button>
					</Grid.Column>
				</Grid>
			</BasicCard>
			<FormModal
				header='Update Password'
				formComponent={UpdatePasswordForm}
				isOpen={isUpdatingPassword}
				setIsOpen={setIsUpdatingPassword}
				size='tiny'
			/>
			<FormModal
				header='UpdateInfo'
				formComponent={UpdateUserInfoForm}
				isOpen={isUpdatingInfo}
				setIsOpen={setIsUpdatingInfo}
				size='tiny'
				user={!loading ? user : null}
			/>
		</>
	);
}
