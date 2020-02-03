import React, { useContext, useEffect } from 'react';
import MaterialTable from 'material-table';

import { RestaurantContext } from 'Contexts/RestaurantContext';

import styles from './Restaurant.module.scss';

const Restaurant = () => {
	const { restaurants, getRestaurants, addRestaurant, updateRestaurant } = useContext(RestaurantContext);
	const columns = [
		{ title: 'Name', field: 'name' },
		{ title: 'Description', field: 'description' },
	];

	useEffect(() => {
		// getRestaurants();
	});

	return (
		<MaterialTable
			className={styles.table}
			title="Restaurants"
			columns={columns}
			data={restaurants}
			editable={{
				onRowAdd: newData =>
					new Promise(resolve => {
						setTimeout(async () => {
							resolve();
							await addRestaurant(newData);
						}, 600);
					}),
				onRowUpdate: (newData, oldData) =>
					new Promise(resolve => {
						setTimeout(async () => {
							resolve();
							if (oldData) {
								await updateRestaurant(newData);
							}
						}, 600);
					}),
				// onRowDelete: oldData =>
				// 	new Promise(resolve => {
				// 		setTimeout(() => {
				// 			resolve();
				// 			setState(prevState => {
				// 				const data = [...prevState.data];
				// 				data.splice(data.indexOf(oldData), 1);
				// 				return { ...prevState, data };
				// 			});
				// 		}, 600);
				// 	}),
			}}
		/>
	);
};

export default Restaurant;
