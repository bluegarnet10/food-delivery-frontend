import React from 'react';
import { Route, Switch } from 'react-router-dom';

import OrderContextProvider from 'Contexts/OrderContext';

import InnerTable from './components/InnerTable';
import OrderDetail from './components/OrderDetail';

const Restaurant = () => {
	return (
		<OrderContextProvider>
			<Switch>
				<Route exact path="/order" render={() => <InnerTable />} />
				<Route exact path="/order/:id" render={() => <OrderDetail />} />
			</Switch>
		</OrderContextProvider>
	);
};

export default Restaurant;
