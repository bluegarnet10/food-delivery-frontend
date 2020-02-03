import React, { useContext, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { RestaurantContext } from 'Contexts/RestaurantContext';
import CustomTable from 'Components/CustomTable';

const InnerTable = ({ editable }) => {
	const { totalCount, restaurants, getRestaurants, deleteRestaurant } = useContext(RestaurantContext);
	const history = useHistory();
	const [isFirst, setFirst] = useState(true);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const columns = [
		{ title: 'Name', field: 'name' },
		{ title: 'Description', field: 'description' },
	];

	const requestData = useCallback(
		(_page = page, _row = rowsPerPage) => {
			getRestaurants({
				_page,
				_row,
			});
		},
		[getRestaurants, page, rowsPerPage]
	);

	useEffect(() => {
		if (isFirst) {
			requestData();
			setFirst(false);
		}
	}, [isFirst, getRestaurants, requestData]);

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
		history.push('/restaurant/add');
	};

	const handleEditItem = details => {
		history.push(`/restaurant/edit/${details._id}`);
	};

	const handleDeleteItem = async details => {
		if (window.confirm('Are you sure to delete this restaurant?')) {
			await deleteRestaurant(details);
			setPage(0);
			requestData();
		}
	};

	const handleClickItem = details => {
		history.push(`/restaurant/${details._id}`);
	};

	return (
		<CustomTable
			title="Restaurants"
			data={restaurants}
			columns={columns}
			totalCount={Number(totalCount)}
			page={page}
			rowsPerPage={rowsPerPage}
			onChangePage={handleChangePage}
			onChangeRowsPerPage={handleChangeRowsPerPage}
			onAddItem={editable ? handleAddItem : null}
			onEditItem={editable ? handleEditItem : null}
			onDeleteItem={editable ? handleDeleteItem : null}
			onClickItem={handleClickItem}
		/>
	);
};

InnerTable.propTypes = {
	editable: PropTypes.bool,
};

InnerTable.defaultProps = {
	editable: false,
};

export default InnerTable;
