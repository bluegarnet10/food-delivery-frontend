import React, { useContext } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import MealContextProvider from 'Contexts/MealContext';
import OrderContextProvider from 'Contexts/OrderContext';
import { SessionContext } from 'Contexts/SessionContext';

import InnerTable from './components/InnerTable';
import InnerForm from './components/InnerForm';

const Meal = () => {
	const { getRole } = useContext(SessionContext);
	const { id } = useParams();

	return (
		<MealContextProvider>
			<OrderContextProvider>
				<Switch>
					<Route
						exact
						path="/restaurant/:id"
						render={() => <InnerTable restaurant_id={id} editable={getRole() === 'owner'} />}
					/>
					{getRole() === 'owner' && (
						<Route
							exact
							path="/restaurant/:id/add"
							render={() => <InnerForm restaurant_id={id} isEdit={false} />}
						/>
					)}
					{getRole() === 'owner' && (
						<Route
							exact
							path="/restaurant/:id/edit/:meal_id"
							component={() => <InnerForm restaurant_id={id} isEdit={true} />}
						/>
					)}
				</Switch>
			</OrderContextProvider>
		</MealContextProvider>
	);
};

export default Meal;
