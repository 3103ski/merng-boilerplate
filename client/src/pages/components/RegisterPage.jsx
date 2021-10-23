import React from 'react';

import { Container } from 'semantic-ui-react';

import { RegisterUserForm, BasicCard } from '../../components';
// import * as style from '../pages.modules.scss';

export default function RegisterUserView(props) {
	return (
		<Container>
			<BasicCard centerSelf title='Register New User'>
				<RegisterUserForm history={props.history} />
			</BasicCard>
		</Container>
	);
}
