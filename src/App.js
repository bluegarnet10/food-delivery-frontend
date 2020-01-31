import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import BookContextProvider from 'Contexts/BookContext';
import SessionContextProvider from 'Contexts/SessionContext';
import { checkAuthentication, getUsername } from 'Tools/SessionHelpers';

import Main from 'Views/Main';
import Signin from 'Views/Auth/Signin';

import './App.css';

const ProtectedRoute = ({ component, ...rest }) => {
	return <Route component={checkAuthentication() ? component : Signin} {...rest} />;
};

const RedirectedRoute = ({ component, ...rest }) => {
	if (checkAuthentication()) {
		return <Redirect to="/" />;
	} else {
		return <Route component={component} {...rest} />;
	}
};

const App = () => {
	return (
		<SessionContextProvider>
			<BookContextProvider>
				<BrowserRouter>
					<Switch>
						<RedirectedRoute exact path="/signin" component={Signin} />
						<ProtectedRoute path="/" component={Main} />
					</Switch>
				</BrowserRouter>
			</BookContextProvider>
		</SessionContextProvider>
	);
};

export default App;
