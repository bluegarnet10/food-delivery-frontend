import React, { createContext, useState } from 'react';

export const MealContext = createContext();

const MealContextProvider = ({ children }) => {
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

	const [meals, setMeals] = useState([]);
	const [totalCount, setTotalCount] = useState(0);

	const getMeals = (restaurant_id, details = {}) => {
		const url =
			process.env.REACT_APP_REST_SERVER +
			'/restaurant/' +
			restaurant_id +
			'/meal/' +
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
				setMeals(res.meals);
				return res.meals;
			});
	};

	const addMeal = (restaurant_id, details) => {
		return fetch(
			process.env.REACT_APP_REST_SERVER + '/restaurant/' + restaurant_id + '/meal',
			options('post', details)
		)
			.then(res => res.json())
			.then(async res => {
				if (res.errors) {
					return res;
				}
				return res;
			});
	};

	const updateMeal = (restaurant_id, details) => {
		return fetch(
			process.env.REACT_APP_REST_SERVER + '/restaurant/' + restaurant_id + '/meal/' + details._id,
			options('put', details)
		)
			.then(res => res.json())
			.then(async res => {
				if (res.errors) {
					return res;
				}
				return res;
			});
	};

	const deleteMeal = (restaurant_id, details) => {
		return fetch(
			process.env.REACT_APP_REST_SERVER + '/restaurant/' + restaurant_id + '/meal/' + details._id,
			options('delete')
		)
			.then(res => res.json())
			.then(async res => {
				if (res.errors) {
					return null;
				}
				return res;
			});
	};

	return (
		<MealContext.Provider value={{ totalCount, meals, getMeals, addMeal, updateMeal, deleteMeal }}>
			{children}
		</MealContext.Provider>
	);
};

export default MealContextProvider;
