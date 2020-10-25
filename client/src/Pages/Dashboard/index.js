import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useAuthDispatch, logout, useAuthState, getAllQuestions, openQuestion, newQuestion } from '../../Context';
import styles from './dashboard.module.css';

function Dashboard(props) {
	const dispatch = useAuthDispatch();
	const { user, questions, token, loading } = useAuthState();

	const [title, setTitle] = useState('')
	const [question, setQuestion] = useState('')

	const history = useHistory()

	const handleLogout = () => {
		logout(dispatch);
		history.push('/login');
	};

	useEffect(() => {
		getAllQuestions(dispatch)
	}, [])

	const handleTitleClick = (question) => {
		try {
			openQuestion(dispatch, question)
			history.push({
				pathname: '/question'
			})
		} catch (error) {
			console.log(error)
		}
	}

	const handleQuestion = async (e) => {
		e.preventDefault()

		let response = await  newQuestion(dispatch, { textone: title, texttwo: question }, token)

		console.log(response)

		if (!response[0].textone) return;

		setQuestion('')
		setTitle('')
	}

	const displayQuestions = questions.map(question => {
		return (
			<div className={styles.questionContainer}>
				<h4 onClick={() => handleTitleClick(question)}>{question.textone}</h4>
				<p>{question.texttwo}</p>
				<p>User: {question.user}</p>
			</div>
		)
	})

	return (
		<div style={{ padding: 10 }}>
			<div className={styles.dashboardPage}>
				<h1>STACKOVERFLOW CLONE</h1>
				<button className={styles.logoutBtn} onClick={handleLogout}>
					Logout
				</button>
			</div>
			<p>Welcome {user}</p>
			<h3>Questions</h3>
			<div>
				<h3>Ask a new question!</h3>
				<form>
					<div className={styles.loginFormItem}>
						<label htmlFor='title'>Enter a title</label>
						<input
							type='text'
							id='title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							disabled={loading}
						/>
					</div>
					<div>
						<label htmlFor='newQuestion'>Enter the question</label>
						<input
							type='text'
							id='question'
							value={question}
							onChange={(e) => setQuestion(e.target.value)}
							disabled={loading}
						/>
					</div>
					<button onClick={handleQuestion} disabled={loading}>
						Post question
					</button>
				</form>
			</div>
			<div>
				{displayQuestions}
			</div>
		</div>

	);
}

export default Dashboard;
