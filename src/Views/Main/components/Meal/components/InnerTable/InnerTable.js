import React, { useContext, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { MealContext } from 'Contexts/MealContext';
import { OrderContext } from 'Contexts/OrderContext';
import CustomTable from 'Components/CustomTable';
import OrderTable from 'Components/OrderTable';

const InnerTable = ({ restaurant_id, editable }) => {
	const { totalCount, meals, getMeals, deleteMeal } = useContext(MealContext);
	const { addOrder } = useContext(OrderContext);
	const history = useHistory();
	const [isFirst, setFirst] = useState(true);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [orders, setOrders] = useState([]);
	const columns = [
		{ title: 'Name', field: 'name' },
		{ title: 'Description', field: 'description' },
		{ title: 'Price', field: 'price' },
	];

	const requestData = useCallback(
		(_page = page, _row = rowsPerPage) => {
			getMeals(restaurant_id, {
				_page,
				_row,
			});
		},
		[getMeals, page, restaurant_id, rowsPerPage]
	);

	useEffect(() => {
		if (isFirst) {
			requestData();
			setFirst(false);
		}
	}, [isFirst, getMeals, requestData]);

	const handleChangePage = (e, newPage) => {
		setPage(newPage);
		requestData(newPage, rowsPerPage);
	};

	const handleChangeRowsPerPage = e => {
		const rows = parseInt(e.target.value, 10);
		setRowsPerPage(rows);
		setPage(0);
		requestData(0, rows);
	};

	const handleAddItem = () => {
		history.push(`/restaurant/${restaurant_id}/add`);
	};

	const handleEditItem = details => {
		history.push(`/restaurant/${restaurant_id}/edit/${details._id}`);
	};

	const handleDeleteItem = async details => {
		if (window.confirm('Are you sure to delete this restaurant?')) {
			await deleteMeal(restaurant_id, details);
			setPage(0);
			requestData();
		}
	};

	const handleAddToOrder = details => {
		setOrders([...orders, details]);
	};

	const handleDeleteOrder = index => {
		setOrders(orders.filter((order, idx) => idx !== index));
	};

	const handleSubmitOrder = () => {
		const meal_list = [];
		orders.map(item => meal_list.push(item._id));
		addOrder({ restaurant_id, meal_list }).then(res => {
			if (!res.errors) {
				history.push('/order');
			}
		});
	};

	return (
		<>
			<CustomTable
				title="Meals"
				data={meals}
				columns={columns}
				totalCount={Number(totalCount)}
				page={page}
				rowsPerPage={rowsPerPage}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
				onAddItem={editable ? handleAddItem : null}
				onEditItem={editable ? handleEditItem : null}
				onDeleteItem={editable ? handleDeleteItem : null}
				onAddToOrder={!editable ? handleAddToOrder : null}
			/>
			<br />
			{!editable && (
				<OrderTable
					title="Order"
					data={orders}
					columns={columns}
					onDeleteItem={handleDeleteOrder}
					onSubmitOrder={handleSubmitOrder}
				/>
			)}
		</>
	);
};

InnerTable.propTypes = {
	restaurant_id: PropTypes.string.isRequired,
	editable: PropTypes.bool,
};

InnerTable.defaultProps = {
	restaurant_id: '',
	editable: false,
};

export default InnerTable;
