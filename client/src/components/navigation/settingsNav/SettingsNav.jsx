import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Menu } from 'semantic-ui-react';

import { USER_SETTINGS, SETTINGS_PROFILE, SETTINGS_LOGIN_INFO } from '../../../routes.js';
import { slugToText, returnPathSegment } from '../../../util/helperFunctions';

export default function SettingsNav() {
	const path = returnPathSegment(useLocation().pathname, 1, true);
	const [activeTab, setActiveTab] = useState(path);

	const handleItemClick = (e, { name }) => setActiveTab(name);

	return (
		<Menu secondary>
			<Menu.Item
				as={Link}
				to={USER_SETTINGS + SETTINGS_PROFILE}
				name={slugToText(SETTINGS_PROFILE)}
				active={activeTab === slugToText(SETTINGS_PROFILE)}
				onClick={handleItemClick}
			/>
			<Menu.Item
				as={Link}
				to={USER_SETTINGS + SETTINGS_LOGIN_INFO}
				name={slugToText(SETTINGS_LOGIN_INFO)}
				active={activeTab === slugToText(SETTINGS_LOGIN_INFO)}
				onClick={handleItemClick}
			/>
		</Menu>
	);
}
