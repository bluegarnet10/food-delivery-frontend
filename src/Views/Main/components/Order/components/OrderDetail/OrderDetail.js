import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MuiThemeProvider, RaisedButton } from 'material-ui';
import { Card, CardActions, CardContent, Typography } from '@material-ui/core';

import { OrderContext } from 'Contexts/OrderContext';
import { SessionContext } from 'Contexts/SessionContext';

import styles from './OrderDetail.module.scss';

const OrderDetail = () => {
	const history = useHistory();
	const { getOrderById, updateOrder } = useContext(OrderContext);
	const { getRole } = useContext(SessionContext);
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
	};

	return (
		<form onSubmit={handleSubmit}>
			<MuiThemeProvider>
				<Card>
					<CardContent className={styles.content}>
						<Typography variant="h4" component="h4">
							Order Detail
						</Typography>
					</CardContent>
					<CardActions className={styles.actions}>
						{getButtonText() && (
							<RaisedButton type="submit" label={`Mark as ${getButtonText()}`} primary={true} />
						)}
						{getRole() === 'owner' && <RaisedButton type="button" label="Block user" secondary={true} />}
					</CardActions>
				</Card>
			</MuiThemeProvider>
		</form>
	);
};

export default OrderDetail;
