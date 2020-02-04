import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	toolBar: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	button: {
		cursor: 'pointer',
	},
}));

const Header = () => {
	const classes = useStyles();
	const history = useHistory();

	const signoutUser = () => {
		localStorage.clear();
		history.push('/');
	};

	return (
		<AppBar position="fixed" className={classes.appBar}>
			<Toolbar className={classes.toolBar}>
				<Link to="/" style={{ color: 'white' }}>
					<Typography variant="h6" noWrap>
						Food Delivery
					</Typography>
				</Link>
				<div onClick={signoutUser} className={classes.button}>
					Sign out
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
