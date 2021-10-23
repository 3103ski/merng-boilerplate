import React from 'react';

import { Container, Image, Grid } from 'semantic-ui-react';

// import * as style from '../pages.modules.scss';
import MERN_LOGO from '../../assets/MERN_LOGO.png';
import GQL_APOLLOW_LOGO from '../../assets/GQL_APOLLO_LOGO.jpg';

export default function LandingPage() {
	return (
		<Container>
			<Grid>
				<Grid.Row>
					<Grid.Column width='8'>
						<Image floated={'right'} size={'medium'} src={MERN_LOGO} />
					</Grid.Column>
					<Grid.Column width='8'>
						<Image size={'medium'} src={GQL_APOLLOW_LOGO} />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Container>
	);
}
