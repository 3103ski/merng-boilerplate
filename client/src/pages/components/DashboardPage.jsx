import React, { useContext } from 'react';

import { useQuery } from '@apollo/client';
import { Container } from 'semantic-ui-react';

import { Loader } from '../../components/';

import { AuthContext } from '../../contexts/';
import { GET_USER } from '../../gql/';
import { TOKEN_TITLE } from '../../config';

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
				<h1>
					{data.getUser.email} is logged in with {TOKEN_TITLE}
				</h1>
			) : (
				<p>oops</p>
			)}
		</Container>
	);
}
