//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import React, { useState, useContext } from 'react';

//~~~  Other Package Imports
import { Button, Grid } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';

//~~~  Local Components
import { BasicCard, FormModal, UpdatePasswordForm, UpdateAuthEmailForm, Loader } from '../';
import { AuthContext } from '../../contexts/';

//~~~ GQL
import { GET_USER } from '../../gql/';
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export default function LoginSettings() {
	const { userId } = useContext(AuthContext);
	console.log('Login settings mounted');

	const { loading, data } = useQuery(GET_USER, {
		variables: {
			userId,
		},
		onError: (err) => {
			console.log(err);
		},
	});

	const authMethod = () => {
		const user = data.getUser;
		if (user) {
			if (user.facebookId) return 'facebook';
			if (user.googleId) return 'google';
			if (user.spotifyId) return 'spotify';
			return 'local';
		}
	};

	return loading ? (
		<Loader />
	) : authMethod() === 'local' ? (
		<LocalAuthSettings user={data.getUser} />
	) : (
		<OAuthInfo user={data.getUser} method={authMethod()} />
	);
}

/**
 * ----> LOCAL COMPONENTS
 */

function OAuthInfo({ method, user }) {
	return (
		<div>
			<p>{`You registered ${user.email} using ${method}.`}</p>
		</div>
	);
}

function LocalAuthSettings({ user }) {
	const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
	const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);

	console.log('auth local auth settings mounted');

	return (
		<>
			<BasicCard centerSelf title={'Login Settings'}>
				<Grid>
					<Grid.Column width={16}>{<p>Email Address: {user.email}</p>}</Grid.Column>

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
				userEmail={user.email}
			/>
			<FormModal
				header='UpdateInfo'
				formComponent={UpdateAuthEmailForm}
				isOpen={isUpdatingInfo}
				setIsOpen={setIsUpdatingInfo}
				size='tiny'
				user={user}
			/>
		</>
	);
}
