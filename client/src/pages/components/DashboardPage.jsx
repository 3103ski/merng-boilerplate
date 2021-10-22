import React, { useContext } from 'react';

import { Container } from 'semantic-ui-react';

import { AuthContext } from '../../context/auth';

export default function UserDashboard() {
	const { user } = useContext(AuthContext);

	return (
		<Container>
			<h1>{user.email} is logged in</h1>
		</Container>
	);
}
