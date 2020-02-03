import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';

import RestaurantContextProvider from 'Contexts/RestaurantContext';
import { SessionContext } from 'Contexts/SessionContext';

import InnerTable from './components/InnerTable';
import AddForm from './components/AddForm';

const Main = () => {
	const { getRole } = useContext(SessionContext);

	return (
		<RestaurantContextProvider>
			<Switch>
				{getRole() === 'owner' && <Route exact path="/restaurant/add" component={AddForm} />}
				<Route exact path="/restaurant" render={() => <InnerTable editable={getRole() === 'owner'} />} />
			</Switch>
		</RestaurantContextProvider>
	);
};

export default Main;
