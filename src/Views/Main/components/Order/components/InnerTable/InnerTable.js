import React, { useContext, useEffect, useState, useCallback } from 'react';

import { OrderContext } from 'Contexts/OrderContext';
import CustomTable from 'Components/CustomTable';

const InnerTable = () => {
	const { totalCount, orders, getOrders } = useContext(OrderContext);
	const [isFirst, setFirst] = useState(true);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const columns = [
		{ title: 'Restaurant', field: 'restaurant_name' },
		{ title: 'Created', field: 'createdAt' },
		{ title: 'Total Price', field: 'total_price' },
		{ title: 'Status', field: 'status' },
	];

	const requestData = useCallback(
		(_page = page, _row = rowsPerPage) => {
			getOrders({
				_page,
				_row,
			});
		},
		[getOrders, page, rowsPerPage]
	);

	useEffect(() => {
		if (isFirst) {
			requestData();
			setFirst(false);
		}
	}, [isFirst, getOrders, requestData]);

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

	const handleClickItem = details => {
		// history.push(`/restaurant/${details._id}`);
	};

	return (
		<CustomTable
			title="Orders"
			data={orders}
			columns={columns}
			totalCount={Number(totalCount)}
			page={page}
			rowsPerPage={rowsPerPage}
			onChangePage={handleChangePage}
			onChangeRowsPerPage={handleChangeRowsPerPage}
			onClickItem={handleClickItem}
		/>
	);
};

InnerTable.propTypes = {};

InnerTable.defaultProps = {};

export default InnerTable;
