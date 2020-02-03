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
		if (method !== 'get') {
			config.body = JSON.stringify(data);
		}
		return config;
	};

	const [restaurants, setRestaurants] = useState([]);

	const getRestaurants = () => {
		return fetch(process.env.REACT_APP_REST_SERVER + '/restaurant', options('get'))
			.then(res => res.json())
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
					return null;
				}
				await getRestaurants();
				return res.restaurant;
			});
	};

	const updateRestaurant = details => {
		return fetch(process.env.REACT_APP_REST_SERVER + '/restaurant', options('put', details))
			.then(res => res.json())
			.then(async res => {
				if (res.errors) {
					return null;
				}
				await getRestaurants();
				return res.restaurant;
			});
	};

	const deleteRestaurant = details => {
		return fetch(process.env.REACT_APP_REST_SERVER + '/restaurant', options('delete'))
			.then(res => res.json())
			.then(async res => {
				if (res.errors) {
					return null;
				}
				await getRestaurants();
				return res;
			});
	};

	return (
		<RestaurantContext.Provider value={{ restaurants, getRestaurants, addRestaurant }}>
			{children}
		</RestaurantContext.Provider>
	);
};

export default RestaurantContextProvider;
