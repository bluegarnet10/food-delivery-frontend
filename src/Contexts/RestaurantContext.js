import React, { createContext, useState } from 'react';

import { showNotification } from 'Tools/showNotification';

export const RestaurantContext = createContext();

const RestaurantContextProvider = ({ children }) => {
	const options = (method = 'get', data = null) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwtToken'),
			},
			method: method,
		};
		if (method !== 'get' && method !== 'delete') {
			config.body = JSON.stringify(data);
		}
		return config;
	};

	const [restaurants, setRestaurants] = useState([]);
	const [totalCount, setTotalCount] = useState(0);

	const getRestaurants = (details = {}) => {
		const url =
			process.env.REACT_APP_REST_SERVER +
			'/restaurant/' +
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
				if (!res.errors) {
					setRestaurants(res.restaurants);
				} else {
					showNotification(res.errors.message, 'error');
				}
				return res;
			});
	};

	const addRestaurant = details => {
		return fetch(process.env.REACT_APP_REST_SERVER + '/restaurant', options('post', details))
			.then(res => res.json())
			.then(res => {
				if (res.errors && res.errors.message) {
					showNotification(res.errors.message, 'error');
				} else if (!res.errors && res.message) {
					showNotification(res.message, 'success');
				}
				return res;
			});
	};

	const updateRestaurant = details => {
		return fetch(process.env.REACT_APP_REST_SERVER + '/restaurant/' + details._id, options('put', details))
			.then(res => res.json())
			.then(res => {
				if (res.errors && res.errors.message) {
					showNotification(res.errors.message, 'error');
				} else if (!res.errors && res.message) {
					showNotification(res.message, 'success');
				}
				return res;
			});
	};

	const deleteRestaurant = details => {
		return fetch(process.env.REACT_APP_REST_SERVER + '/restaurant/' + details._id, options('delete'))
			.then(res => res.json())
			.then(res => {
				if (res.errors && res.errors.message) {
					showNotification(res.errors.message, 'error');
				} else if (!res.errors && res.message) {
					showNotification(res.message, 'success');
				}
			});
	};

	return (
		<RestaurantContext.Provider
			value={{ totalCount, restaurants, getRestaurants, addRestaurant, updateRestaurant, deleteRestaurant }}
		>
			{children}
		</RestaurantContext.Provider>
	);
};

export default RestaurantContextProvider;
