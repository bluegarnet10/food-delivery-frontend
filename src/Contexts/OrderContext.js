import React, { createContext, useState } from 'react';

export const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
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

	const [orders, setOrders] = useState([]);
	const [totalCount, setTotalCount] = useState(0);

	const getOrders = (details = {}) => {
		const url =
			process.env.REACT_APP_REST_SERVER +
			'/order/' +
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
				setOrders(res.orders);
				return res.orders;
			});
	};

	const addOrder = details => {
		return fetch(process.env.REACT_APP_REST_SERVER + '/order', options('post', details)).then(res => res.json());
	};

	const updateOrder = details => {
		return fetch(process.env.REACT_APP_REST_SERVER + '/order/' + details._id, options('put', details)).then(res =>
			res.json()
		);
	};

	const getOrderById = id => {
		return fetch(process.env.REACT_APP_REST_SERVER + '/order/' + id, options('get')).then(res => res.json());
	};

	return (
		<OrderContext.Provider
			value={{
				totalCount,
				orders,
				getOrders,
				addOrder,
				updateOrder,
				getOrderById,
			}}
		>
			{children}
		</OrderContext.Provider>
	);
};

export default OrderContextProvider;
