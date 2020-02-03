import React, { createContext, useState } from 'react';

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
				if (res.errors) {
					return null;
				}
				setRestaurants(res.restaurants);
				return res.restaurants;
			});
	};

	const addRestaurant = details => {
		return fetch(process.env.REACT_APP_REST_SERVER + '/restaurant', options('post', details))
			.then(res => res.json())
			.then(async res => {
				if (res.errors) {
					return res;
				}
				return res;
			});
	};

	const updateRestaurant = details => {
		return fetch(process.env.REACT_APP_REST_SERVER + '/restaurant/' + details._id, options('put', details))
			.then(res => res.json())
			.then(async res => {
				if (res.errors) {
					return res;
				}
				return res;
			});
	};

	const deleteRestaurant = details => {
		return fetch(process.env.REACT_APP_REST_SERVER + '/restaurant/' + details._id, options('delete'))
			.then(res => res.json())
			.then(async res => {
				if (res.errors) {
					return null;
				}
				return res;
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
