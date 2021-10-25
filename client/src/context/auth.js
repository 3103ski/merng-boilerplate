import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import { updateObj } from '../util/helperFunctions';
import { TOKEN_TITLE } from '../config';

const initialState = {
	user: null,
};

if (localStorage.getItem(TOKEN_TITLE)) {
	const decodedToken = jwtDecode(localStorage.getItem(TOKEN_TITLE));

	if (decodedToken.exp * 1000 < Date.now()) {
		localStorage.removeItem(TOKEN_TITLE);
	} else {
		initialState.user = decodedToken;
	}
}

const AuthContext = createContext(initialState);

const authReducer = (state, { type, payload, updatedUser }) => {
	switch (type) {
		case 'UPDATE':
			return updateObj(state, {
				user: updatedUser,
			});
		case 'LOGIN':
			return updateObj(state, {
				user: payload,
			});
		case 'LOGOUT':
			return initialState;
		default:
			return state;
	}
};

const AuthProvider = (props) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	const loginSuccess = (userData) => {
		localStorage.setItem(TOKEN_TITLE, userData.token);

		dispatch({ type: 'LOGIN', payload: userData });
	};

	const logout = () => {
		localStorage.removeItem(TOKEN_TITLE);
		dispatch({ type: 'LOGOUT' });
	};

	const updateUserInfo = async (updates) => {
		const updatedUser = await updateObj(state.user, updates);
		dispatch({ type: 'UPDATE', updatedUser });
	};

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				loginSuccess,
				logout,
				updateUserInfo,
			}}
			{...props}
		/>
	);
};

export { AuthContext, AuthProvider };
