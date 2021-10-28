import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'semantic-ui-react';

import { AuthContext } from '../../contexts/auth';
import { LANDING, LOGIN, REGISTER, DASHBOARD, USER_SETTINGS } from '../../routes.js';

export default function Navbar() {
	const [activeItem, setActiveItem] = useState();
	const { token, logout } = useContext(AuthContext);

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
		<Menu inverted>
			<MenuLink to={LANDING} name='landing' />

			{token ? <MenuLink to={DASHBOARD} name='dashboard' /> : null}

			{!token ? (
				<>
					<MenuLink to={LOGIN} name='login' right />
					<MenuLink to={REGISTER} name='register' />
				</>
			) : (
				<>
					<MenuLink to={USER_SETTINGS} name='settings' right />
					<MenuLink to={LOGIN} name='logout' onClick={logout} />
				</>
			)}
		</Menu>
	);
}
