import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

export default function CustomSemanticUILoader({ dark, loadingText = 'Loading' }) {
	return dark ? (
		<Dimmer active>
			<Loader content={loadingText} />
		</Dimmer>
	) : (
		<Dimmer active inverted>
			<Loader inverted content={loadingText} />
		</Dimmer>
	);
}
