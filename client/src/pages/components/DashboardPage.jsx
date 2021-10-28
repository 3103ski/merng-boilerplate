import React, { useContext } from 'react';

import { useQuery } from '@apollo/client';
import { Container } from 'semantic-ui-react';

import { Loader } from '../../components/';

import { AuthContext } from '../../contexts/';
import { GET_USER } from '../../gql/';

export default function UserDashboard() {
	const { userId } = useContext(AuthContext);
	const { loading, data } = useQuery(GET_USER, {
		variables: {
			userId,
		},
	});

	return (
		<Container>{loading ? <Loader /> : <h1>{data.getUser.email} is logged in</h1>}</Container>
	);
}
