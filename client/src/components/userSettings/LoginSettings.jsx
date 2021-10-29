//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import React, { useState } from 'react';

//~~~  Other Package Imports
import { Button, Grid } from 'semantic-ui-react';

//~~~  Local Components
import { BasicCard, FormModal, UpdatePasswordForm, UpdateAuthEmailForm, Loader } from '../';
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export default function LoginSettings({ loading, user }) {
	const methodOfAuthentication = (() => {
		if (user.facebookId) return 'facebook';
		if (user.googleId) return 'google';
		if (user.spotifyId) return 'spotify';

		return 'local';
	})();

	return (() => {
		switch (methodOfAuthentication) {
			case 'google':
			case 'facebook':
			case 'spotify':
				return <OAuthInfo user={user} loading={loading} method={methodOfAuthentication} />;
			default:
				return <LocalAuthSettings user={user} loading={loading} />;
		}
	})();
}

/**
 * ----> LOCAL COMPONENTS
 */

function OAuthInfo({ user, method, loading }) {
	return !loading ? (
		<div>
			<p>{`You registered ${user.email} using ${method}.`}</p>
		</div>
	) : null;
}

function LocalAuthSettings({ user, loading }) {
	const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
	const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);

	return (
		<>
			<BasicCard centerSelf title={'Login Settings'}>
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
				formComponent={UpdateAuthEmailForm}
				isOpen={isUpdatingInfo}
				setIsOpen={setIsUpdatingInfo}
				size='tiny'
				user={!loading ? user : null}
			/>
		</>
	);
}
