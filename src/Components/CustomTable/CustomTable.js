import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
	table: {
		minWidth: 500,
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
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
}) => {
	const classes = useStyles();

	const formatText = (str, type) => {
		if (type === 'date') {
			return new Date(str).toLocaleDateString();
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
							{(onEditItem || onDeleteItem || onAddToOrder) && <TableCell>Actions</TableCell>}
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row, index) => (
							<TableRow key={index} onClick={() => onClickItem(row)}>
								{columns.map((value, idx) => (
									<TableCell key={idx}>{formatText(row[value.field], value.type)}</TableCell>
								))}
								{(onEditItem || onDeleteItem || onAddToOrder) && (
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
									</TableCell>
								)}
							</TableRow>
						))}
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
	onClickItem: () => {},
	onAddItem: null,
	onEditItem: null,
	onDeleteItem: null,
	onAddToOrder: null,
};

export default CustomTable;
