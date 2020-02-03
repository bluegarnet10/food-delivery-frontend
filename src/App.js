import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import SessionContextProvider from 'Contexts/SessionContext';
import { checkAuthentication } from 'Tools/SessionHelpers';

import Main from 'Views/Main';
import Signin from 'Views/Auth/Signin';
import Signup from 'Views/Auth/Signup';

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
			<BrowserRouter>
				<Switch>
					<RedirectedRoute exact path="/signin" component={Signin} />
					<RedirectedRoute exact path="/signup" component={Signup} />
					<ProtectedRoute path="/" component={Main} />
				</Switch>
			</BrowserRouter>
		</SessionContextProvider>
	);
};

export default App;
