import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import Header from './components/Header';
import Footer from './components/Footer';
import TransactionList from './components/TransactionList';
import TransactionDetail from './components/TransactionDetail';
import { useAuthQuery } from './helpers/state/authApi';
import { setToken } from './helpers/state/api';


import { auth } from './helpers/state/authSlice'

import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

function App() {
  	const dispatch = useDispatch()

	const [ hasToken, setHasToken ] = useState<boolean>(false)
	const { data } = useAuthQuery(undefined, { skip: !hasToken })

	useEffect(() => {
		const token = window.localStorage.getItem('app-jwt-token');

		if (!!token) {
			setToken(token)
			setHasToken(true)

			if (!!data) {
				dispatch(auth(data))
			} else {
				if ( window.location.pathname !== '/') {
					window.location.pathname = '/'
				}
			}

		}
	}, [data, dispatch]);
  
  return (
    <Router>
		<div className="App">
			<Header />
			<div className="content">
				<Routes>
					<Route path="/transactions" Component={TransactionList} />
					<Route path="/transactions/:id" Component={TransactionDetail} />
					<Route path="/transactions/new" Component={TransactionDetail} />
					<Route path="/sign-up" Component={Auth} />
					<Route path="/sign-in" Component={Auth} />
					<Route path="/" Component={Dashboard} />
				</Routes>
			</div>
			<Footer />
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</div>
	</Router>
  );
}

export default App;
