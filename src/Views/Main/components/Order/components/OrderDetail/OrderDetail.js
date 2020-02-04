import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MuiThemeProvider, RaisedButton } from 'material-ui';
import {
	Card,
	CardActions,
	CardContent,
	Typography,
	TableContainer,
	Table,
	TableBody,
	TableRow,
	TableCell,
} from '@material-ui/core';

import { OrderContext } from 'Contexts/OrderContext';
import { SessionContext } from 'Contexts/SessionContext';
import { BlockContext } from 'Contexts/BlockContext';

import styles from './OrderDetail.module.scss';

const OrderDetail = () => {
	const history = useHistory();
	const { getOrderById, updateOrder } = useContext(OrderContext);
	const { getRole } = useContext(SessionContext);
	const { blockUser } = useContext(BlockContext);
	const { id } = useParams();

	const [isFirst, setFirst] = useState(true);
	const [detail, setDetail] = useState(null);

	useEffect(() => {
		if (isFirst) {
			setFirst(false);
			getOrderById(id).then(res => {
				if (res.errors) {
					history.push('/order');
				} else {
					setDetail(res.order);
				}
			});
		}
	}, [getOrderById, history, id, isFirst]);

	const getButtonText = () => {
		if (detail) {
			const { status } = detail;
			const role = getRole();
			if (status === 'Placed') {
				if (role === 'user') {
					return 'Canceled';
				} else {
					return 'Processing';
				}
			} else if (status === 'Processing') {
				if (role === 'owner') {
					return 'In Route';
				}
			} else if (status === 'In Route') {
				if (role === 'owner') {
					return 'Delivered';
				}
			} else if (status === 'Delivered') {
				if (role === 'user') {
					return 'Received';
				}
			}
		}
		return null;
	};

	const handleSubmit = e => {
		e.preventDefault();
		updateOrder({ _id: id, status: getButtonText() }).then(res => {
			if (!res.errors) {
				history.push('/order');
			}
		});
	};

	const handleBlockUser = e => {
		e.stopPropagation();
		blockUser(detail.user_id).then(res => {
			if (!res.errors) {
				history.push('/block');
			}
		});
	};

	const getMealTable = () => {
		const { meal_list, total_price } = detail;
		return (
			<Table>
				<TableBody>
					{meal_list.map((meal, idx) => (
						<TableRow key={idx}>
							<TableCell>{meal.name}</TableCell>
							<TableCell>{meal.description}</TableCell>
							<TableCell>{Number(meal.price).toLocaleString()}</TableCell>
						</TableRow>
					))}
					<TableRow>
						<TableCell>
							<b>Total Price</b>
						</TableCell>
						<TableCell>
							<b>{Number(total_price).toLocaleString()}</b>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		);
	};

	const getHistoryTable = () => {
		const { histories } = detail;
		return (
			<Table>
				<TableBody>
					{histories.map((history, idx) => (
						<TableRow key={idx}>
							<TableCell>{history.status}</TableCell>
							<TableCell>{new Date(history.date).toLocaleString()}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		);
	};

	return (
		<form onSubmit={handleSubmit}>
			<MuiThemeProvider>
				<Card>
					<CardContent className={styles.content}>
						<Typography variant="h4" component="h4">
							Order Detail
						</Typography>
						<br />
						{detail && (
							<TableContainer>
								<Table className={styles.table}>
									<TableBody>
										<TableRow>
											<TableCell>Restaurant</TableCell>
											<TableCell>
												<b>{detail.restaurant_name}</b>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Meals</TableCell>
											<TableCell>{getMealTable()}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Status</TableCell>
											<TableCell>
												<b>{detail.status}</b>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Histories</TableCell>
											<TableCell>{getHistoryTable()}</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
						)}
					</CardContent>
					<CardActions className={styles.actions}>
						{getButtonText() && (
							<RaisedButton type="submit" label={`Mark as ${getButtonText()}`} primary={true} />
						)}
						{getRole() === 'owner' && (
							<RaisedButton type="button" label="Block user" secondary={true} onClick={handleBlockUser} />
						)}
					</CardActions>
				</Card>
			</MuiThemeProvider>
		</form>
	);
};

export default OrderDetail;
