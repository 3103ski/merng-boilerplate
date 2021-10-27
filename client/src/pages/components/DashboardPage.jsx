import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { Container } from 'semantic-ui-react';
import { AuthContext } from '../../contexts/';
import { Loader } from '../../components/';
import { GET_USER } from '../../gql/';

export default function UserDashboard() {
	const { userId } = useContext(AuthContext);
	const { loading, data, refetch } = useQuery(GET_USER, {
		variables: {
			userId,
		},
	});
	useEffect(() => {
		console.log('data :: ', data);
		console.log('userId :: ', userId);
		if (userId && data === undefined) {
			refetch();
		}
	}, [userId, data, refetch]);
	console.log(data);

	return <Container>{loading ? <Loader /> : <h1> is logged in</h1>}</Container>;
}
