import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';

import RestaurantContextProvider from 'Contexts/RestaurantContext';
import { SessionContext } from 'Contexts/SessionContext';
import Meal from 'Views/Main/components/Meal';

import InnerTable from './components/InnerTable';
import InnerForm from './components/InnerForm';

const Restaurant = () => {
	const { getRole } = useContext(SessionContext);

	return (
		<RestaurantContextProvider>
			<Switch>
				<Route exact path="/restaurant" render={() => <InnerTable editable={getRole() === 'owner'} />} />
				{getRole() === 'owner' && (
					<Route exact path="/restaurant/add" render={() => <InnerForm isEdit={false} />} />
				)}
				{getRole() === 'owner' && (
					<Route exact path="/restaurant/edit/:id" render={() => <InnerForm isEdit={true} />} />
				)}
				<Route path="/restaurant/:id" component={Meal} />
			</Switch>
		</RestaurantContextProvider>
	);
};

export default Restaurant;
