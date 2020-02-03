import React, { useContext, useEffect, useState } from 'react';
import MaterialTable from 'material-table';

import { RestaurantContext } from 'Contexts/RestaurantContext';

import styles from './Restaurant.module.scss';

const Restaurant = () => {
	const { totalCount, restaurants, getRestaurants, addRestaurant, updateRestaurant, deleteRestaurant } = useContext(
		RestaurantContext
	);
	const [isFirst, setFirst] = useState(true);
	const columns = [
		{ title: 'Name', field: 'name' },
		{ title: 'Description', field: 'description' },
	];

	useEffect(() => {
		if (isFirst) {
			getRestaurants();
			setFirst(false);
		}
	});

	return (
		<div className={styles.table}>
			<MaterialTable
				title="Restaurants"
				columns={columns}
				data={restaurants}
				totalCount={totalCount}
				options={{
					search: false,
				}}
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
					onRowDelete: oldData =>
						new Promise(resolve => {
							setTimeout(async () => {
								resolve();
								if (oldData) {
									await deleteRestaurant(oldData);
								}
							}, 600);
						}),
				}}
			/>
		</div>
	);
};

export default Restaurant;
