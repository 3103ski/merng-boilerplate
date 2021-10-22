import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { TOKEN_TITLE } from '../config';

const AuthRoute = ({ path, component: Component, ...rest }) => {
	const { user } = useContext(AuthContext);
	return (
		<Route
			path={path}
			{...rest}
			render={(props) => {
				if (!user) {
					localStorage.removeItem(TOKEN_TITLE);
				}
				return !user ? <Redirect to='/login' /> : <Component {...props} />;
			}}
		/>
	);
};

export default AuthRoute;
