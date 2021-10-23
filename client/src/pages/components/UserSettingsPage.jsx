import React, { useContext, useState } from 'react';

import { Container, Button, Grid } from 'semantic-ui-react';

import { AuthContext } from '../../context/';
import { BasicCard, FormModal, UpdatePasswordForm } from '../../components/';

export default function UserSettingsPage() {
	const { user } = useContext(AuthContext);
	const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

	return (
		<Container>
			<BasicCard centerSelf title={'User Settings'}>
				<Grid>
					<Grid.Row>
						<Grid.Column>
							<p>Email Address: {user.email}</p>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={8}>
							<Button size='tiny' onClick={() => setIsUpdatingPassword(true)}>
								Change Password
							</Button>
						</Grid.Column>
						<Grid.Column width={8}>
							<Button size='tiny' color='teal'>
								Update Settings
							</Button>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</BasicCard>
			<FormModal
				formComponent={UpdatePasswordForm}
				isOpen={isUpdatingPassword}
				setIsOpen={setIsUpdatingPassword}
				size='tiny'
			/>
		</Container>
	);
}
