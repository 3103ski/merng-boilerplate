import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'semantic-ui-react';

import { AuthContext } from '../../../contexts/auth';
import { slugToText } from '../../../util/helperFunctions';
import {
	LANDING,
	LOGIN,
	REGISTER,
	DASHBOARD,
	USER_SETTINGS,
	SETTINGS_PROFILE,
} from '../../../routes.js';
import * as style from './mainNav.module.scss';

export default function Navbar() {
	const [activeItem, setActiveItem] = useState();
	const { token, logout } = useContext(AuthContext);
	const [LANDING_LABEL, LOGOUT_LABEL] = ['landing', 'logout'];

	const handleItemClick = (_, { name }) => setActiveItem(name);

	const MenuLink = ({ to, right, name, onClick }) => (
		<Menu.Item
			active={activeItem === name}
			name={name}
			position={right ? 'right' : null}
			onClick={onClick ? onClick : handleItemClick}
			as={Link}
			to={to}
		/>
	);

	return (
		<Menu className={style.Container} inverted>
			<MenuLink to={LANDING} name={LANDING_LABEL} />

			{token ? <MenuLink to={DASHBOARD} name={slugToText(DASHBOARD)} /> : null}

			{!token ? (
				<>
					<MenuLink to={LOGIN} name={slugToText(LOGIN)} right />
					<MenuLink to={REGISTER} name={slugToText(REGISTER)} />
				</>
			) : (
				<>
					<MenuLink
						to={`${USER_SETTINGS}${SETTINGS_PROFILE}`}
						name={slugToText(USER_SETTINGS)}
						right
					/>
					<MenuLink to={LOGIN} name={LOGOUT_LABEL} onClick={logout} />
				</>
			)}
		</Menu>
	);
}
