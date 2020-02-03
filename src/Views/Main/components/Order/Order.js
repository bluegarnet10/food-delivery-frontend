import React from 'react';
import { Route, Switch } from 'react-router-dom';

import OrderContextProvider from 'Contexts/OrderContext';

import InnerTable from './components/InnerTable';

const Restaurant = () => {
	return (
		<OrderContextProvider>
			<Switch>
				<Route exact path="/order" render={() => <InnerTable />} />
			</Switch>
		</OrderContextProvider>
	);
};

export default Restaurant;
