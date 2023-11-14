import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import React, { useEffect, useCallback } from 'react';

// import SignIn from './components/SignIn/SignIn';
// import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import SignIn from './components/SignIn/SignIn';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// import { fetchLoggedUser, logout } from './helpers/state/authSlice';
// import { loaded } from './helpers/state/commonSlice';

// import api from './helpers/api';

import './App.scss';

function App() {
  // const dispatch = useDispatch();

	useEffect(() => {
		const token = window.localStorage.getItem('app-jwt-token');
		
		if (!!token) {
			// api.setToken(token);
			// dispatch(fetchLoggedUser());
		}
		
		// api.setLogoutFn(() => dispatch(logout()));
		// dispatch(loaded());
	
	}, []);
  
  return (
    <Router>
		<div className="App">
			<Header />
			<div className="content">
				<Routes>
					{/* <Route path="/transactions" Component={TransactionsList} /> */}
					{/* <Route path="/transactions/new" Component={TransactionAdd} /> */}
					{/* <Route path="/transaction/:id" Component={TransactionEdit} /> */}
					{/* <Route path="/analysis" Component={Analysis} /> */}
					{/* <Route path="/sign-up" Component={SignUp} /> */}
					<Route path="/sign-in" Component={SignIn} />
					<Route path="/" Component={Dashboard} />
				</Routes>
			</div>
			<Footer />
		</div>
	</Router>
  );
}

export default App;
