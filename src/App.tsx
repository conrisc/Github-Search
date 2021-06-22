import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import './App.sass';

import { UserBrowser } from 'components/UserBrowser';

function App(): JSX.Element {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/search">
					<UserBrowser />
				</Route>
				<Route path="/">
					<Redirect to="/search" />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
