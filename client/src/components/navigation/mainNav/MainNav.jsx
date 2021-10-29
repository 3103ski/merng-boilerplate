import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { slugToText, returnPathSegment } from '../../../util/helperFunctions';

import * as style from './mainNav.module.scss';

import { AuthContext } from '../../../contexts/auth';
import {
	LANDING,
	LOGIN,
	REGISTER,
	DASHBOARD,
	USER_SETTINGS,
	SETTINGS_PROFILE,
} from '../../../routes.js';

export default function Navbar() {
	const { token, logout } = useContext(AuthContext);
	const [landingLabel, logoutLabel] = ['landing', 'logout'];

	const path = returnPathSegment(useLocation().pathname, 0, true);
	const [activeItem, setActiveItem] = useState(path);

	const handleItemClick = (_, { name }) => setActiveItem(slugToText(name));

	function MenuLink({ to, right, name, onClick }) {
		return (
			<Menu.Item
				active={activeItem === slugToText(name)}
				name={name}
				position={right ? 'right' : null}
				onClick={onClick ? onClick : handleItemClick}
				as={Link}
				to={to}
			/>
		);
	}

	function handleOnLogoutClick() {
		logout();
		setActiveItem(slugToText(LOGIN));
	}

	useEffect(() => {
		setActiveItem(path);
	}, [path]);

	return (
		<Menu className={style.Container} inverted>
			<MenuLink to={LANDING} name={landingLabel} />

			{token ? <MenuLink to={DASHBOARD} name={DASHBOARD} /> : null}

			<Menu.Menu position={'right'}>
				{!token ? (
					<>
						<MenuLink to={LOGIN} name={LOGIN} right />
						<MenuLink to={REGISTER} name={REGISTER} />
					</>
				) : (
					<>
						<MenuLink to={`${USER_SETTINGS}${SETTINGS_PROFILE}`} name={USER_SETTINGS} />
						<MenuLink to={LOGIN} name={logoutLabel} onClick={handleOnLogoutClick} />
					</>
				)}
			</Menu.Menu>
		</Menu>
	);
}
