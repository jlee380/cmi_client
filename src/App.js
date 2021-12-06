import React from 'react';
import { useState, useEffect } from 'react';
// import TimesheetForm from './components/TimesheetForm';
// import TimesheetList from './components/TimesheetList';
import Login from './components/Login';
// import TimesheetAdmin from './components/TimesheetAdmin';
import Dashboard from './components/Dashboard';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavigationBar';
import Welcome from './components/Welcome';
import axios from 'axios';
// import { UserContext } from './components/UserContext';
// import { UserProvider } from "./components/UserContext";

const App = () => {
	const [login, setLogin] = useState(false);

	useEffect(() => {
		sessionUserControl();
	}, [login]);

	const sessionUserControl = () => {
		const userInStorage = localStorage.getItem('user');
		if (userInStorage == undefined || null) {
			console.log('no localStorage user');
		} else {
			console.log(localStorage.getItem('user'));
			console.log('setLogin true');
			setLogin(true);
		}
	};
	const updateLogin = () => {
		// setLogin(!login);
	};

	const getUser = async () => {
		try {
			const getUser = await axios.get(
				'http://localhost:4001/currentUser',
				{
					withCredentials: true,
				}
			);

			if (getUser) {
				console.log(getUser.data);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<Router>
			{/* {console.log(login)} */}
			{/* <UserContext.Provider value={{ login, updateLogin }}> */}
			<Navbar />
			<button onClick={getUser}>getUser</button>
			<div className='container'>
				<br />
				<Routes>
					<Route path='/' element={<Welcome />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/login' element={<Login />} />
				</Routes>
				{/* <Route path="/timesheet">
						<TimesheetForm />
						<br />
						<TimesheetList />
					</Route>
					<Route path="/admin" component={TimesheetAdmin} /> */}
			</div>
			{/* </UserContext.Provider> */}
		</Router>
	);
};

export default App;
