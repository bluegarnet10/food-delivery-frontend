import React, { createContext } from 'react';

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

	const requestUserSignin = (email, password) => {
		const data = { email, password };
		return fetch(process.env.REACT_APP_REST_SERVER + '/signin', options('post', data))
			.then(res => res.json())
			.then(res => {
				if (!res.errors) {
					localStorage.setItem('jwtToken', res.user.token);
					localStorage.setItem('username', res.user.name);
				}
				return res;
			});
	};

	return <SessionContext.Provider value={{ requestUserSignin }}>{children}</SessionContext.Provider>;
};

export default SessionContextProvider;
