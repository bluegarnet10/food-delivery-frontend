import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import RestaurantContextProvider from 'Contexts/RestaurantContext';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Restaurant from './components/Restaurant';

const Main = () => {
	const useStyles = makeStyles(theme => ({
		root: {
			display: 'flex',
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
		},
		toolbar: theme.mixins.toolbar,
	}));
	const classes = useStyles();

	return (
		<RestaurantContextProvider>
			<div className={classes.root}>
				<Header />
				<Sidebar />
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Switch>
						<Route exact path="/" component={Restaurant} />
					</Switch>
				</main>
			</div>
		</RestaurantContextProvider>
	);
};

export default Main;
