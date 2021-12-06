import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
// import { UserContext } from './UserContext';

export default function Login() {
	const [userAccount, setUserAccount] = useState();
	const [userPassword, setUserPassword] = useState();

	// const { updateLogin } = useContext(UserContext);

	useEffect(() => {}, []);

	const HandleLogin = async (e) => {
		e.preventDefault();
		try {
			const userLogin = await axios({
				method: 'POST',
				data: {
					username: userAccount,
					password: userPassword,
				},
				withCredentials: true,
				url: 'http://localhost:4001/login',
			});

			if (userLogin) {
				// updateLogin(true);
				console.log(userLogin);
				localStorage.setItem('user', userLogin.data.user.id); // Using sessionStorage
				// history.push("/");
				window.location.reload(false);
			}
		} catch (error) {
			return error.message;
		}
	};

	return (
		<>
			<form>
				<input
					type='text'
					onChange={(e) => {
						setUserAccount(e.target.value);
					}}
				/>
				<input
					type='password'
					onChange={(e) => {
						setUserPassword(e.target.value);
					}}
				/>
				<button onClick={HandleLogin}>submit</button>
			</form>
			{userAccount}
			{userPassword}

			{/* <Form>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Control
						type='text'
						placeholder='Enter email'
						onChange={(e) => {
							setUserAccount(e.target.value);
						}}
						defaultValue=''
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Control
						type='password'
						placeholder='Password'
						onChange={(e) => {
							setUserPassword(e.target.value);
						}}
						defaultValue=''
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicCheckbox'>
					<Form.Check type='checkbox' label='Remember me' />
				</Form.Group>
				<Button variant='primary' onClick={HandleLogin}>
					Submit
				</Button>
			</Form> */}
		</>
	);
}
