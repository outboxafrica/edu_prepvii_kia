import React from 'react';
import { useAuthDispatch, logout, useAuthState } from '../../Context';
import styles from './dashboard.module.css';

function Dashboard(props) {
	const dispatch = useAuthDispatch();
	const userDetails = useAuthState();

	const handleLogout = () => {
		logout(dispatch);
		props.history.push('/login');
	};
	return (
		<div>
			<div className={styles.dashboardPage}>
				<section>
					<h2>Welcome <code>{userDetails.user}</code></h2>
					<u><h3>Rules and regulations</h3></u>
					<ul>
						<li>If this is your first time at Stack Overflow, you HAVE to read the <strong>FAQ.</strong></li>
						<li>Each question should have only one accepted answer.</li>
						<li>NEVER EVER make up rules for EDU Stack Overflow.</li>
						<li>You are not allowed to advertise on EDU Stack overflow.</li>
					</ul>
					<h3>How can we help you?</h3>
					<form>
						<input placeholder="Type your question here" autoFocus/>
                         <button>Post</button>
					</form>
				</section>
				<button className={styles.logoutBtn} onClick={handleLogout}>
					Logout
				</button>
			</div>
		</div>
	);
}

export default Dashboard;
