import React from 'react';
import { Route, Switch } from 'react-router-dom';

import BlockContextProvider from 'Contexts/BlockContext';

import InnerTable from './components/InnerTable';

const Restaurant = () => {
	return (
		<BlockContextProvider>
			<Switch>
				<Route exact path="/block" render={() => <InnerTable />} />
			</Switch>
		</BlockContextProvider>
	);
};

export default Restaurant;
