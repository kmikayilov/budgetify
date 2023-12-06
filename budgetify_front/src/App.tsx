import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import React, { useEffect } from 'react';

import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Header from './components/Header';
import Footer from './components/Footer';
import TransactionList from './components/TransactionList';
import TransactionDetail from './components/TransactionDetail';
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
					<Route path="/transactions" Component={TransactionList} />
					<Route path="/transactions/:id" Component={TransactionDetail} />
					<Route path="/transactions/new" Component={TransactionDetail} />
					<Route path="/sign-up" Component={SignUp} />
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
