import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import axios from 'axios';
// import { UserContext } from './UserContext';

const NavigationBar = () => {
	// const { updateLogin } = useContext(UserContext);
	const [userInSession, setUserInSession] = useState(null);
	useEffect(() => {
		const userExist = localStorage.getItem('user');
		console.log(`${userExist} userExist, navbar to see if user in session`);
		setUserInSession(userExist);
	}, [userInSession]);

	const HandleLogout = async () => {
		localStorage.removeItem('user');

		try {
			console.log('try');
			const deleteUser = await axios.get('http://localhost:4001/logout', {
				withCredentials: true,
			});

			if (deleteUser) {
				console.log('Logged out');
			}
		} catch (error) {
			console.log(error.message);
		}

		document.location.href = '/login';
	};

	return (
		<>
			<Navbar bg='light' expand='lg'>
				<Container>
					<Navbar.Brand href='#home'>CMI Internal</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='me-auto'>
							<Nav.Link as={Link} to='/'>
								Welcome
							</Nav.Link>
							<Nav.Link as={Link} to='/dashboard'>
								Dashboard
							</Nav.Link>
							<NavDropdown
								title='Timesheet'
								id='basic-nav-dropdown'>
								<NavDropdown.Item as={Link} to='timesheet'>
									Submit
								</NavDropdown.Item>
								<NavDropdown.Item href='#action/3.2'>
									Admin
								</NavDropdown.Item>
								<NavDropdown.Item href='#action/3.3'>
									Something
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href='#action/3.4'>
									Separated link
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
						<Nav>
							{userInSession ? (
								<Link to='/'>
									<Button onClick={HandleLogout}>
										Logout
									</Button>
								</Link>
							) : (
								<Link to='/login'>
									<Button>Login</Button>
								</Link>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default NavigationBar;
