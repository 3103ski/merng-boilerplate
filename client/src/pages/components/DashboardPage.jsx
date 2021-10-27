import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';

import { Container } from 'semantic-ui-react';
import { AuthContext } from '../../contexts/';
import { Loader } from '../../components/';
import { GET_USER } from '../../gql/';

export default function UserDashboard() {
	const { userId } = useContext(AuthContext);
	const { loading, data } = useQuery(GET_USER, {
		variables: {
			userId,
		},
	});
	console.log(data);

	return <Container>{loading ? <Loader /> : <h1> is logged in</h1>}</Container>;
}
