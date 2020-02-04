import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
	Table,
	TableContainer,
	TableHead,
	TableBody,
	TableCell,
	TableFooter,
	TablePagination,
	TableRow,
	Paper,
	Fab,
	IconButton,
	Toolbar,
	Typography,
	Button,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
	table: {
		minWidth: 500,
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	tableItem: {
		cursor: 'pointer',
	},
	noItem: {
		width: '100%',
		height: '100px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

const CustomTable = ({
	title,
	data,
	columns,
	totalCount,
	page,
	rowsPerPage,
	onChangePage,
	onChangeRowsPerPage,
	onAddItem,
	onEditItem,
	onDeleteItem,
	onClickItem,
	onAddToOrder,
	onUnblockUser,
}) => {
	const classes = useStyles();

	const formatText = (str, type) => {
		if (type === 'date') {
			return new Date(str).toLocaleString();
		} else if (type === 'number') {
			return Number(str).toLocaleString();
		} else if (type === 'status') {
			if (str === 'Placed') {
				return (
					<Button variant="outlined" color="primary">
						{str}
					</Button>
				);
			} else if (str === 'Canceled') {
				return (
					<Button variant="outlined" color="secondary">
						{str}
					</Button>
				);
			} else if (str === 'Received') {
				return (
					<Button variant="contained" color="secondary">
						{str}
					</Button>
				);
			}
			return (
				<Button variant="contained" color="primary">
					{str}
				</Button>
			);
		}
		return str;
	};

	return (
		<Paper>
			<Toolbar className={classes.toolbar}>
				<Typography className={classes.title} variant="h6" id="tableTitle">
					{title}
				</Typography>
				{onAddItem && (
					<Fab size="small" color="primary" aria-label="add" className={classes.margin} onClick={onAddItem}>
						<AddIcon />
					</Fab>
				)}
			</Toolbar>
			<TableContainer>
				<Table className={classes.table} aria-label="custom table">
					<TableHead>
						<TableRow>
							{columns.map((value, idx) => (
								<TableCell key={idx}>{value.title}</TableCell>
							))}
							{(onEditItem || onDeleteItem || onAddToOrder || onUnblockUser) && (
								<TableCell>Actions</TableCell>
							)}
						</TableRow>
					</TableHead>
					<TableBody>
						{data.length > 0 ? (
							data.map((row, index) => (
								<TableRow
									hover
									key={index}
									className={onClickItem ? classes.tableItem : ''}
									onClick={() => onClickItem && onClickItem(row)}
								>
									{columns.map((value, idx) => (
										<TableCell key={idx}>{formatText(row[value.field], value.type)}</TableCell>
									))}
									{(onEditItem || onDeleteItem || onAddToOrder || onUnblockUser) && (
										<TableCell>
											{onEditItem && (
												<IconButton
													color="primary"
													onClick={e => {
														e.stopPropagation();
														onEditItem(row);
													}}
												>
													<EditIcon />
												</IconButton>
											)}
											{onDeleteItem && (
												<IconButton
													color="secondary"
													onClick={e => {
														e.stopPropagation();
														onDeleteItem(row);
													}}
												>
													<DeleteIcon />
												</IconButton>
											)}
											{onAddToOrder && (
												<Button
													variant="contained"
													color="secondary"
													onClick={e => {
														e.stopPropagation();
														onAddToOrder(row);
													}}
												>
													Add To Order
												</Button>
											)}
											{onUnblockUser && (
												<Button
													variant="contained"
													color="secondary"
													onClick={e => {
														e.stopPropagation();
														onUnblockUser(row);
													}}
												>
													Unblock
												</Button>
											)}
										</TableCell>
									)}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length + 1}>
									<Typography className={classes.noItem}>No records to display</Typography>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25]}
								colSpan={3}
								count={totalCount}
								rowsPerPage={rowsPerPage}
								page={page}
								SelectProps={{
									inputProps: { 'aria-label': 'rows per page' },
									native: true,
								}}
								onChangePage={onChangePage}
								onChangeRowsPerPage={onChangeRowsPerPage}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</Paper>
	);
};

CustomTable.propTypes = {
	title: PropTypes.string,
	data: PropTypes.array,
	columns: PropTypes.array,
	totalCount: PropTypes.number,
	page: PropTypes.number,
	rowsPerPage: PropTypes.number,
	onChangePage: PropTypes.func,
	onChangeRowsPerPage: PropTypes.func,
	onAddItem: PropTypes.func,
	onEditItem: PropTypes.func,
	onDeleteItem: PropTypes.func,
	onClickItem: PropTypes.func,
	onAddToOrder: PropTypes.func,
	onUnblockUser: PropTypes.func,
};

CustomTable.defaultProps = {
	title: '',
	data: [],
	columns: [],
	totalCount: 0,
	page: 0,
	rowsPerPage: 5,
	onChangePage: () => {},
	onChangeRowsPerPage: () => {},
	onClickItem: null,
	onAddItem: null,
	onEditItem: null,
	onDeleteItem: null,
	onAddToOrder: null,
	onUnblockUser: null,
};

export default CustomTable;
