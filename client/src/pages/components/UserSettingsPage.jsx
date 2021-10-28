import React, { useContext, useState } from 'react';

import { Container, Button, Grid } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';

import {
	BasicCard,
	FormModal,
	UpdatePasswordForm,
	UpdateUserInfoForm,
	Loader,
} from '../../components/';

import { AuthContext } from '../../contexts';
import { GET_USER } from '../../gql/';

export default function UserSettingsPage() {
	const { userId } = useContext(AuthContext);

	const { loading, data } = useQuery(GET_USER, {
		variables: {
			userId,
		},
		onError: (err) => {
			console.log(err);
		},
	});

	const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
	const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);

	return (
		<Container>
			<BasicCard centerSelf title={'User Settings'}>
				<Grid>
					<Grid.Row>
						<Grid.Column>
							{loading ? <Loader /> : <p>Email Address: {data.getUser.email}</p>}
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={8}>
							<Button size='tiny' onClick={() => setIsUpdatingPassword(true)}>
								Change Password
							</Button>
						</Grid.Column>
						<Grid.Column width={8}>
							<Button
								size='tiny'
								onClick={() => setIsUpdatingInfo(true)}
								color='teal'>
								Update Info
							</Button>
						</Grid.Column>
					</Grid.Row>
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
				user={!loading ? data.getUser : null}
			/>
		</Container>
	);
}
