import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import { updateObj } from '../util/helperFunctions';
import { TOKEN_TITLE } from '../config.js';
import { LOGIN_SUCCES_REDIRECT, NO_AUTH_REDIRECT, SERVER_URL } from '../routes.js';

const initialState = {
	token: null,
	userId: null,
	errorMsg: null,
	isLoading: false,
};

if (localStorage.getItem(TOKEN_TITLE)) {
	const decodedToken = jwtDecode(localStorage.getItem(TOKEN_TITLE));

	if (decodedToken.exp * 1000 < Date.now()) {
		localStorage.removeItem(TOKEN_TITLE);
	} else {
		initialState.token = localStorage.getItem(TOKEN_TITLE);
		initialState.userId = decodedToken._id;
	}
}

const AuthContext = createContext(initialState);

const authReducer = (state, { type, token, userId, errorMsg }) => {
	switch (type) {
		case 'AUTH_START':
			return updateObj(state, {
				isLoading: true,
				errorMsg: null,
				token: null,
				userId: null,
			});
		case 'AUTH_SUCCESS':
			return updateObj(state, {
				token,
				userId,
				isLoading: false,
			});
		case 'AUTH_ERROR':
			return updateObj(state, {
				userId: null,
				token: null,
				isLoading: false,
				errorMsg,
			});
		case 'LOGOUT':
			return initialState;
		default:
			return state;
	}
};

const AuthProvider = (props) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	const authStart = () => dispatch({ type: 'AUTH_START', isLoading: true });

	const authSuccess = (token, userId) => {
		localStorage.setItem(TOKEN_TITLE, token);
		return dispatch({ type: 'AUTH_SUCCESS', token, userId });
	};

	const authError = (err) => {
		localStorage.removeItem(TOKEN_TITLE);
		return dispatch({ type: 'AUTH_ERROR', errorMsg: err });
	};

	const authRegisterApi = async ({ authEndpoint, data, method = 'post' }, history) => {
		const url = await `${SERVER_URL}${authEndpoint}`;
		const headers = await {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		await authStart();

		return axios({ url, data, headers, method })
			.then(
				({
					data: {
						success,
						token,
						user: { _id },
					},
				}) => {
					if (success) {
						authSuccess(token, _id);
						return history.push(LOGIN_SUCCES_REDIRECT);
					}
				}
			)
			.catch((err) => {
				authError(err);
				return history.push(NO_AUTH_REDIRECT);
			});
	};

	const logout = () => {
		localStorage.removeItem(TOKEN_TITLE);
		return dispatch({ type: 'LOGOUT' });
	};

	return (
		<AuthContext.Provider
			value={{
				userId: state.userId,
				token: state.token,
				isLoading: state.isLoading,
				errorMsg: state.errorMsg,
				authStart,
				authSuccess,
				authError,
				authRegisterApi,
				logout,
			}}
			{...props}
		/>
	);
};

export { AuthContext, AuthProvider };
