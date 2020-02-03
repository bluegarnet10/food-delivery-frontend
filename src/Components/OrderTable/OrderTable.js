import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
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

const OrderTable = ({ title, data, columns, onDeleteItem, onSubmitOrder }) => {
	const classes = useStyles();
	const totalPrice = data.reduce((value, item) => value + item.price, 0);

	return (
		<Paper>
			<Toolbar className={classes.toolbar}>
				<Typography className={classes.title} variant="h6" id="tableTitle">
					{title}
				</Typography>
			</Toolbar>
			<TableContainer>
				<Table className={classes.table} aria-label="custom table">
					<TableHead>
						<TableRow>
							{columns.map((value, idx) => (
								<TableCell key={idx}>{value.title}</TableCell>
							))}
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row, index) => (
							<TableRow key={index}>
								{columns.map((value, idx) => (
									<TableCell key={idx}>{row[value.field]}</TableCell>
								))}
								<TableCell>
									<IconButton
										color="secondary"
										onClick={e => {
											e.stopPropagation();
											onDeleteItem(index);
										}}
									>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
						<TableRow>
							<TableCell>
								<h6>Total Price</h6>
							</TableCell>
							<TableCell>
								<h6>{totalPrice}</h6>
							</TableCell>
							{new Array(columns.length - 1).fill(0).map((val, idx) => (
								<TableCell key={idx} />
							))}
						</TableRow>
						<TableRow>
							<TableCell>
								<Button
									variant="contained"
									color="secondary"
									disabled={totalPrice <= 0}
									onClick={e => {
										e.stopPropagation();
										onSubmitOrder();
									}}
								>
									Complete Order
								</Button>
							</TableCell>
							{new Array(columns.length).fill(0).map((val, idx) => (
								<TableCell key={idx} />
							))}
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};

OrderTable.propTypes = {
	title: PropTypes.string,
	data: PropTypes.array,
	columns: PropTypes.array,
	onDeleteItem: PropTypes.func,
	onSubmitOrder: PropTypes.func,
};

OrderTable.defaultProps = {
	title: '',
	data: [],
	columns: [],
	onDeleteItem: () => {},
	onSubmitOrder: () => {},
};

export default OrderTable;
