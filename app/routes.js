import React from 'react';
import {Router, Route, IndexRoute,
  IndexRedirect, Redirect, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';

//These are the different containers that need to be rendered
import App from "./containers/App";


const appHistory = createHashHistory({
  hashType: 'slash' // the default
})



export default ()=>(
	<Router history={appHistory}>
		<Route path="/" component={App}>
		</Route>
	</Router>
)