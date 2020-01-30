import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import BookContextProvider from 'Contexts/BookContext';
import Main from 'Views/Main';

import './App.css';

const App = () => {
	return (
		<BookContextProvider>
			<BrowserRouter>
				<Switch>
					<Route path="/" component={Main} />
				</Switch>
			</BrowserRouter>
		</BookContextProvider>
	);
};

export default App;
