import React from 'react';

import { Container } from 'semantic-ui-react';

import { RegisterUserForm, BasicCard } from '../../components';

export default function RegisterUserView(props) {
	return (
		<Container>
			<BasicCard centerSelf title='Register New User'>
				<RegisterUserForm history={props.history} />
			</BasicCard>
		</Container>
	);
}
