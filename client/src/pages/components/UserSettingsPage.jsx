import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Container } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';

import { SettingsNavigation, LoginSettings, ProfileSettings } from '../../components/';

import { AuthContext } from '../../contexts';
import { USER_SETTINGS, SETTINGS_PROFILE, SETTINGS_LOGIN_INFO } from '../../routes.js';
import { GET_USER } from '../../gql/';

export default function UserSettingsPage(props) {
	const { userId } = useContext(AuthContext);

	const { loading, data } = useQuery(GET_USER, {
		variables: {
			userId,
		},
		onError: (err) => {
			console.log(err);
		},
	});

	return !loading ? (
		<Container>
			<SettingsNavigation />
			<Switch>
				<Route
					path={`${USER_SETTINGS}${SETTINGS_PROFILE}`}
					render={() => <ProfileSettings user={data.getUser} />}
				/>
				<Route
					path={`${USER_SETTINGS}${SETTINGS_LOGIN_INFO}`}
					render={() => <LoginSettings userId={userId} />}
				/>
			</Switch>
		</Container>
	) : null;
}
