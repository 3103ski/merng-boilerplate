import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';
import { TOKEN_TITLE } from '../config';
import { NO_AUTH_REDIRECT } from '../routes.js';

const AuthRoute = ({ path, component: Component, ...rest }) => {
	const { token } = useContext(AuthContext);
	return (
		<Route
			path={path}
			{...rest}
			render={(props) => {
				if (!token) {
					localStorage.removeItem(TOKEN_TITLE);
				}
				return !token ? <Redirect to={NO_AUTH_REDIRECT} /> : <Component {...props} {...rest} />;
			}}
		/>
	);
};

export default AuthRoute;
