import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';

import RestaurantContextProvider from 'Contexts/RestaurantContext';
import { SessionContext } from 'Contexts/SessionContext';

import InnerTable from './components/InnerTable';
import InnerForm from './components/InnerForm';

const Main = () => {
	const { getRole } = useContext(SessionContext);

	return (
		<RestaurantContextProvider>
			<Switch>
				<Route exact path="/restaurant" render={() => <InnerTable editable={getRole() === 'owner'} />} />
				{getRole() === 'owner' && (
					<Route exact path="/restaurant/add" render={() => <InnerForm isEdit={false} />} />
				)}
				{getRole() === 'owner' && (
					<Route exact path="/restaurant/edit/:id" component={() => <InnerForm isEdit={true} />} />
				)}
			</Switch>
		</RestaurantContextProvider>
	);
};

export default Main;
