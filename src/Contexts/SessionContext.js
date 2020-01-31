import React, { createContext } from 'react';
import { checkAuthentication } from 'Tools/SessionHelpers';

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
	const options = (method = 'get', data = 'null') => {
		return {
			headers: {
				'Content-Type': 'application/json',
			},
			method: method,
			body: JSON.stringify(data),
		};
	};

	const getUsername = () => {
		return checkAuthentication() ? localStorage.getItem('username') : '';
	};

	const getRole = () => {
		return checkAuthentication() ? localStorage.getItem('role') : '';
	};

	const requestUserSignin = (email, password) => {
		const data = { email, password };
		return fetch(process.env.REACT_APP_REST_SERVER + '/signin', options('post', data))
			.then(res => res.json())
			.then(res => {
				if (!res.errors) {
					localStorage.setItem('jwtToken', res.user.token);
					localStorage.setItem('username', res.user.name);
					localStorage.setItem('role', res.user.role);
				}
				return res;
			});
	};

	const requestUserSignup = (email, password, name, role) => {
		const data = { email, password, name, role };
		return fetch(process.env.REACT_APP_REST_SERVER + '/signup', options('post', data)).then(res => res.json());
	};

	return (
		<SessionContext.Provider value={{ getUsername, getRole, requestUserSignin, requestUserSignup }}>
			{children}
		</SessionContext.Provider>
	);
};

export default SessionContextProvider;
