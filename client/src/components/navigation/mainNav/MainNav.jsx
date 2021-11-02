import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { slugToText, returnPathSegment } from '../../../util/helperFunctions';

import * as style from './mainNav.module.scss';

import { AuthContext } from '../../../contexts/auth';
import { LANDING, LOGIN, REGISTER, DASHBOARD, USER_SETTINGS, SETTINGS_PROFILE } from '../../../routes.js';

export default function Navbar() {
	const path = returnPathSegment(useLocation().pathname, 0, true);
	const [activeItem, setActiveItem] = useState(path);
	const { token, logout } = useContext(AuthContext);

	// Local Components
	const MenuLink = ({ to, right, name, onClick }) => (
		<Menu.Item
			active={activeItem === slugToText(name)}
			name={name}
			position={right ? 'right' : null}
			onClick={onClick ? onClick : handleItemClick}
			as={Link}
			to={to}
		/>
	);

	// --- Visible Wihout A Token
	const PublicButtonsLeftSide = () => (
		<>
			<MenuLink to={LANDING} name={'landing'} />
		</>
	);

	const NoTokenButtonsRightSide = () =>
		!token ? (
			<>
				<MenuLink to={LOGIN} name={LOGIN} right />
				<MenuLink to={REGISTER} name={REGISTER} />
			</>
		) : null;

	// --- Links only show WITH TOKEN available
	const WithTokenButtonsLeftSide = () =>
		token ? (
			<>
				<MenuLink to={DASHBOARD} name={DASHBOARD} />
			</>
		) : null;

	const WithTokenButtonsRightSide = ({ logout }) =>
		token ? (
			<>
				<MenuLink to={`${USER_SETTINGS}${SETTINGS_PROFILE}`} name={USER_SETTINGS} />
				<MenuLink to={LOGIN} name={'logout'} onClick={logout} />
			</>
		) : null;

	// Local Handlers
	const handleOnLogoutClick = () => {
		logout();
		setActiveItem(slugToText(LOGIN));
	};

	const handleItemClick = (_, { name }) => setActiveItem(slugToText(name));

	// Side Effects
	useEffect(() => {
		setActiveItem(path);
	}, [path]);

	return (
		<Menu className={style.Container} inverted>
			<PublicButtonsLeftSide />
			<WithTokenButtonsLeftSide />

			<Menu.Menu position={'right'}>
				<NoTokenButtonsRightSide />
				<WithTokenButtonsRightSide logout={handleOnLogoutClick} />
			</Menu.Menu>
		</Menu>
	);
}
