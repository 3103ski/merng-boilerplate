import React from 'react';

import { Container } from 'semantic-ui-react';

import { LoginForm } from '../../components/';

export default function LoginView(props) {
	return (
		<Container>
			<LoginForm history={props.history} />
		</Container>
	);
}
