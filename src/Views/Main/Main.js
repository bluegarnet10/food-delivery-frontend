import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { SessionContext } from 'Contexts/SessionContext';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Restaurant from './components/Restaurant';

const Main = () => {
	const { getRole } = useContext(SessionContext);
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
		<div className={classes.root}>
			<Header />
			<Sidebar />
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Switch>
					<Route path="/restaurant" component={Restaurant} />
					<Redirect from="/" to="/restaurant" />
				</Switch>
			</main>
		</div>
	);
};

export default Main;
