import React from 'react';

import { Container } from 'semantic-ui-react';

import { RegisterUserForm } from '../../components/';
// import * as style from '../pages.modules.scss';

export default function RegisterUserView(props) {
	return (
		<Container>
			<RegisterUserForm history={props.history} />
		</Container>
	);
}
