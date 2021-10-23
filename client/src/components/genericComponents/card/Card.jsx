import React from 'react';

import { Card } from 'semantic-ui-react';

import * as style from './card.module.scss';

export default function CustomSemanticUICard({ title, centerSelf, children }) {
	return (
		<Card centered={centerSelf}>
			<Card.Content textAlign='center'>
				{title ? <Card.Header className={style.Header}>{title}</Card.Header> : null}
				<Card.Content>{children}</Card.Content>
			</Card.Content>
		</Card>
	);
}
