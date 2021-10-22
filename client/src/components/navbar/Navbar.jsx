import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'semantic-ui-react';

import { AuthContext } from '../../context/auth';

export default function Navbar() {
	const [activeItem, setActiveItem] = useState();
	const { user, logout } = useContext(AuthContext);

	const handleItemClick = (_, { name }) => setActiveItem(name);

	return (
		<Menu inverted>
			<Menu.Item
				name='landing'
				active={activeItem === 'landing'}
				onClick={handleItemClick}
				as={Link}
				to='/'
			/>

			{user ? (
				<Menu.Item
					name='dashboard'
					active={activeItem === 'dashboard'}
					onClick={handleItemClick}
					as={Link}
					to='/user-dash'
				/>
			) : null}

			{!user ? (
				<>
					<Menu.Item
						position='right'
						name='login'
						active={activeItem === 'login'}
						onClick={handleItemClick}
						as={Link}
						to='/login'
					/>
					<Menu.Item
						name='register'
						active={activeItem === 'register'}
						onClick={handleItemClick}
						as={Link}
						to={'/register'}
					/>
				</>
			) : (
				<Menu.Item name='logout' position='right' onClick={logout} as={Link} to='/login' />
			)}
		</Menu>
	);
}
