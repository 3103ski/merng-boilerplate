import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'semantic-ui-react';

import { AuthContext } from '../../context/auth';

export default function Navbar() {
	const [activeItem, setActiveItem] = useState();
	const { user, logout } = useContext(AuthContext);

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
			<MenuLink to='/' name='landing' />

			{user ? <MenuLink name='dashboard' to='/user-dash' /> : null}

			{!user ? (
				<>
					<MenuLink to='/login' name='login' right />
					<MenuLink to='/register' name='register' />
				</>
			) : (
				<>
					<MenuLink to='/user-settings' name='settings' right />
					<MenuLink to='/login' name='logout' onClick={logout} />
				</>
			)}
		</Menu>
	);
}
