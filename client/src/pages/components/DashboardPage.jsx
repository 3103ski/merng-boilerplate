import React, { useContext } from 'react';

import { useQuery } from '@apollo/client';
import { Container } from 'semantic-ui-react';

import { Loader } from '../../components/';

import { AuthContext } from '../../contexts/';
import { GET_USER } from '../../gql/';

export default function UserDashboard() {
	const { userId } = useContext(AuthContext);
	const { loading, data, error } = useQuery(GET_USER, {
		variables: {
			userId,
		},
	});

	return (
		<Container>
			{loading ? (
				<Loader />
			) : !error ? (
				<h1>Welcome {data.getUser.displayName}! You're logged in!</h1>
			) : (
				<p>oops</p>
			)}
		</Container>
	);
}
