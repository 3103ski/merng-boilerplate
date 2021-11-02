import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import { updateObj } from '../util/helperFunctions';
import { TOKEN_TITLE } from '../config.js';
import { LOGIN_SUCCES_REDIRECT, SERVER_URL } from '../routes.js';

const initialState = {
	token: null,
	userId: null,
	errorMsg: null,
	isLoading: false,
	errors: {},
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

const authReducer = (state, { type, token, userId, errors }) => {
	switch (type) {
		case 'AUTH_START':
			return updateObj(state, {
				isLoading: true,
				errors: {},
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
				errors,
			});
		case 'SET_ERRORS':
			return updateObj(state, {
				isLoading: false,
				errors,
			});
		case 'CLEAR_ERRORS':
			return updateObj(state, {
				errors: {},
			});
		case 'LOGOUT':
			return initialState;
		default:
			return state;
	}
};

const AuthProvider = (props) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	const logout = () => {
		localStorage.removeItem(TOKEN_TITLE);
		return dispatch({ type: 'LOGOUT' });
	};

	const clearErrors = () => (Object.keys(state.errors).length > 0 ? dispatch({ type: 'CLEAR_ERRORS' }) : null);

	/**		Start, Succeed, Fail   */
	const authStart = () => dispatch({ type: 'AUTH_START', isLoading: true });
	const authSuccess = (token, userId) => {
		localStorage.setItem(TOKEN_TITLE, token);
		return dispatch({ type: 'AUTH_SUCCESS', token, userId });
	};
	const authError = (errors) => {
		localStorage.removeItem(TOKEN_TITLE);
		return dispatch({ type: 'AUTH_ERROR', errors });
	};
	const setErrors = (errors) => {
		return dispatch({ type: 'SET_ERRORS', errors });
	};

	/**		API Methods */
	const authRegisterApi = async ({ authEndpoint, data, method = 'post', headers = {} }, history, callback) => {
		const url = await `${SERVER_URL}${authEndpoint}`;
		const hdrs = await {
			headers: {
				'Content-Type': 'application/json',
				...headers,
			},
		};

		/** the 'history' value is flagging if this api call should be treated as a login success/fail
		 *  or an atttempt to just change data like auth email or update password
		 */

		if (history) await authStart();
		return axios({ url, data, hdrs, method })
			.then(
				({
					data: {
						success,
						token,
						user: { _id },
					},
				}) => {
					if (success) {
						if (callback) return callback();

						if (history) {
							authSuccess(token, _id);
							return history.push(LOGIN_SUCCES_REDIRECT);
						}
					}
				}
			)
			.catch((err) => {
				console.log(err.response);
				if (err.response.statusText === 'Unauthorized') {
					if (history) return authError({ password: 'The Email or Password you entered is incorrect' });
					return setErrors({ password: 'The Email or Password you entered is incorrect' });
				}
				if (err.response.data.errors) {
					if (err.response.statusText === 'Bad Request' || err.response.data.msg === 'MISSING_INPUT')
						return setErrors(err.response.data.errors);
					return authError(err.response.data.errors);
				}
				if (err.response.statusText === 'Bad Request')
					return setErrors({ message: 'Something went wrong. Make sure you are entering real credentials' });
				console.log('This error was not correctly handled by auth.js context:: ', err.response);
			});
	};

	return (
		<AuthContext.Provider
			value={{
				userId: state.userId,
				token: state.token,
				isLoading: state.isLoading,
				errors: state.errors,
				authStart,
				authSuccess,
				authError,
				authRegisterApi,
				logout,
				setErrors,
				clearErrors,
			}}
			{...props}
		/>
	);
};

export { AuthContext, AuthProvider };
