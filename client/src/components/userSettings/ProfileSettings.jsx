//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import React, { useState } from 'react';

//~~~ Other Package Imports
import { Button, Grid } from 'semantic-ui-react';

//~~~  Local Components
import { BasicCard, FormModal, Loader, UpdateUserProfileForm } from '../../components/';
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export default function ProfileSettings({ loading, user }) {
	const [isUpdatingProfile, setIsUpdatingPassword] = useState(false);

	return (
		<>
			<BasicCard centerSelf title={'Profile Settings'}>
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
				header='Edit Profile'
				user={!loading ? user : null}
				formComponent={UpdateUserProfileForm}
				isOpen={isUpdatingProfile}
				setIsOpen={setIsUpdatingPassword}
				size='tiny'
			/>
		</>
	);
}
