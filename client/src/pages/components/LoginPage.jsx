import React from 'react';

import { Container } from 'semantic-ui-react';

import { LoginForm, BasicCard } from '../../components';

export default function LoginView(props) {
	return (
		<Container>
			<BasicCard centerSelf title='Login'>
				<LoginForm history={props.history} />
			</BasicCard>
		</Container>
	);
}
