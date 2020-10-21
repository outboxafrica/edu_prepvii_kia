import React, { useState } from 'react';

import { signupUser, useAuthState, useAuthDispatch } from '../../Context';
import styles from './signup.module.css';

function Signup(props) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [username, setUsername] = useState('');
	const [location, setLocation] = useState('');

	const dispatch = useAuthDispatch();
	const { loading, errorMessage } = useAuthState();

	const handleSignup = async (e) => {
		e.preventDefault();

		try {
			let response = await signupUser(dispatch, { name, email, password, confirmPassword, username, location });
			if (!response.email) return;
			props.history.push('/login');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.sign}>
				<h1>Signup Page</h1>
				{errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}
				<form className={styles.signupForm}>
					{/* <div className={styles.loginForm}> */}
						<div className={styles.loginFormItem}>
							<label htmlFor='name'>Name</label>
							<input
							    autoFocus
							    className={styles.signupInput}
								type='text'
								id='name'
								value={name}
								onChange={(e) => setName(e.target.value)}
								disabled={loading}
							/>
						</div>
						<div className={styles.loginFormItem}>
							<label htmlFor='username'>Username</label>
							<input
							    className={styles.signupInput}
								type='text'
								id='username'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								disabled={loading}
							/>
						</div>
						<div className={styles.loginFormItem}>
							<label htmlFor='location'>Location</label>
							<input
							    className={styles.signupInput}
								type='text'
								id='location'
								value={location}
								onChange={(e) => setLocation(e.target.value)}
								disabled={loading}
							/>
						</div>
						<div className={styles.loginFormItem}>
							<label htmlFor='email'>Email</label>
							<input
							    className={styles.signupInput}
								type='text'
								id='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={loading}
							/>
						</div>
						<div className={styles.loginFormItem}>
							<label htmlFor='password'>Password</label>
							<input
							    className={styles.signupInput}
								type='password'
								id='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled={loading}
							/>
						</div>
						<div className={styles.loginFormItem}>
							<label htmlFor='confirmPassword'>Confirm Password</label>
							<input
							    className={styles.signupInput}
								type='password'
								id='confirmPassword'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								disabled={loading}
							/>
						</div>
					{/* </div> */}
					<button onClick={handleSignup} disabled={loading}>
						login
					</button>
				</form>
			</div>
		</div>
	);
}

export default Signup;
