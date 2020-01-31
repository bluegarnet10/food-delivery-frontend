import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import BlockIcon from '@material-ui/icons/Block';
import { makeStyles } from '@material-ui/core/styles';

import { SessionContext } from 'Contexts/SessionContext';

const drawerWidth = 240;

const Sidebar = () => {
	const { getRole } = useContext(SessionContext);

	const useStyles = makeStyles(theme => ({
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
		},
		drawerPaper: {
			width: drawerWidth,
		},
		link: {
			color: 'black',
		},
		toolbar: theme.mixins.toolbar,
	}));

	const classes = useStyles();

	const routes = [
		{ to: '/', name: 'Restaurants', icon: <RestaurantIcon /> },
		{ to: '/orders', name: 'Orders', icon: <ShoppingCartIcon /> },
	];

	if (getRole() === 'owner') {
		routes.push({ to: '/block', name: 'Blocked', icon: <BlockIcon /> });
	}

	return (
		<Drawer
			className={classes.drawer}
			variant="permanent"
			classes={{
				paper: classes.drawerPaper,
			}}
		>
			<div className={classes.toolbar} />
			<List>
				{routes.map((route, idx) => (
					<Link to={route.to} key={idx} className={classes.link}>
						<ListItem button>
							<ListItemIcon>{route.icon}</ListItemIcon>
							<ListItemText primary={route.name} />
						</ListItem>
					</Link>
				))}
			</List>
		</Drawer>
	);
};

export default Sidebar;
