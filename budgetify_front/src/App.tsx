import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import React, { useEffect, useCallback } from 'react';

// import SignIn from './components/SignIn/SignIn';
// import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';

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
				<Routes>
					{/* <Route path="/sign-up" Component={SignUp} /> */}
					{/* <Route path="/sign-in" Component={SignIn} /> */}
					<Route path="/" Component={Home} />
				</Routes>
			</div>
		</Router>
  );
}

export default App;
