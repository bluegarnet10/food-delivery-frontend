import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from 'Components/Navbar';
import Dashboard from 'Components/Dashboard';
import About from 'Components/About';
import Contact from 'Components/Contact';

const Main = () => {
	return (
		<>
			<Navbar />
			<Switch>
				<Route exact path="/" component={Dashboard} />
				<Route path="/about" component={About} />
				<Route path="/contact" component={Contact} />
			</Switch>
		</>
	);
};

export default Main;
