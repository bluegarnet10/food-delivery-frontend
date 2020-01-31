import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Dashboard from 'Components/Dashboard';
import About from 'Components/About';
import Contact from 'Components/Contact';

import Sidebar from './components/Sidebar';
import Header from './components/Header';

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
		<div className={classes.root}>
			<Header />
			<Sidebar />
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Switch>
					<Route exact path="/" component={Dashboard} />
					<Route path="/about" component={About} />
					<Route path="/contact" component={Contact} />
				</Switch>
			</main>
		</div>
	);
};

export default Main;
