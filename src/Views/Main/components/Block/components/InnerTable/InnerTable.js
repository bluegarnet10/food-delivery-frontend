import React, { useContext, useEffect, useState, useCallback } from 'react';

import { BlockContext } from 'Contexts/BlockContext';
import CustomTable from 'Components/CustomTable';

const InnerTable = () => {
	const { totalCount, blockedUsers, getBlockedUsers, unBlockUser } = useContext(BlockContext);
	const [isFirst, setFirst] = useState(true);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const columns = [{ title: 'Name', field: 'user_name' }];

	const requestData = useCallback(
		(_page = page, _row = rowsPerPage) => {
			getBlockedUsers({
				_page,
				_row,
			});
		},
		[getBlockedUsers, page, rowsPerPage]
	);

	useEffect(() => {
		if (isFirst) {
			requestData();
			setFirst(false);
		}
	}, [isFirst, requestData]);

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

	const handleUnblockUser = async detail => {
		if (window.confirm('Are you sure to unblock this user?')) {
			await unBlockUser(detail.user_id);
			setPage(0);
			requestData(0, rowsPerPage);
		}
	};

	return (
		<CustomTable
			title="Blocks"
			data={blockedUsers}
			columns={columns}
			totalCount={Number(totalCount)}
			page={page}
			rowsPerPage={rowsPerPage}
			onChangePage={handleChangePage}
			onChangeRowsPerPage={handleChangeRowsPerPage}
			onUnblockUser={handleUnblockUser}
		/>
	);
};

export default InnerTable;
