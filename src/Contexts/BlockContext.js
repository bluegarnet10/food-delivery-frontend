import React, { createContext, useState } from 'react';

export const BlockContext = createContext();

const BlockContextProvider = ({ children }) => {
	const options = (method = 'get', data = null) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwtToken'),
			},
			method: method,
		};
		if (method !== 'get') {
			config.body = JSON.stringify(data);
		}
		return config;
	};

	const [blockedUsers, setBlockedUsers] = useState([]);
	const [totalCount, setTotalCount] = useState(0);

	const getBlockedUsers = (details = {}) => {
		const url =
			process.env.REACT_APP_REST_SERVER +
			'/block/' +
			'?_page=' +
			(details._page ? details._page : 0) +
			'&_row=' +
			(details._row ? details._row : 5);
		return fetch(url, options('get'))
			.then(res => {
				if (res.ok) {
					for (var pair of res.headers.entries()) {
						if (pair[0] === 'x-total-count') {
							setTotalCount(pair[1]);
						}
					}
				}
				return res.json();
			})
			.then(res => {
				if (res.errors) {
					return res;
				}
				setBlockedUsers(res.blocks);
				return res;
			});
	};

	const blockUser = user_id => {
		const data = { user_id };
		return fetch(process.env.REACT_APP_REST_SERVER + '/block', options('post', data)).then(res => res.json());
	};

	const unBlockUser = user_id => {
		const data = { user_id };
		return fetch(process.env.REACT_APP_REST_SERVER + '/block', options('delete', data)).then(res => res.json());
	};

	return (
		<BlockContext.Provider value={{ blockedUsers, totalCount, getBlockedUsers, blockUser, unBlockUser }}>
			{children}
		</BlockContext.Provider>
	);
};

export default BlockContextProvider;
