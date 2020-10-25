import React, { useState } from 'react';
import { useAuthDispatch, logout, useAuthState, answerQuestion } from '../../Context';
import styles from './question.module.css';

function Question(props) {
	const [newAnswer, setNewAnswer] = useState('')

	const dispatch = useAuthDispatch();
	const { user, question, answers, loading, token } = useAuthState();

	const handleAnswer = async (e) => {
		e.preventDefault()

		let response = await answerQuestion(dispatch, { text: newAnswer }, question, token)
		if (!response.questions[0].textone) return;

		setNewAnswer('')
	}

	const handleLogout = () => {
		logout(dispatch);
		props.history.push('/login');
	};

	let answerIdArray = Object.values(question.answers[0])

	const displayAnswers = answerIdArray.map(answer => {
		return answers.map(ans => {
			if (answer._id === ans._id) {
				return (
					<div>
						<p>{ans.text}</p>
						<p>User: {ans.user}</p>
					</div>
				)
			}
		})
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
				<div className={styles.questionContainer}>
					<h4>{question.textone}</h4>
					<p>{question.texttwo}</p>
					<p>User: {question.user}</p>
				</div>
				<div>
					<h5>Answers</h5>
					{displayAnswers}
				</div>
				<form>
					<div>
						<label htmlFor='newAnswer'>Enter an Answer</label>
						<input
							type='text'
							id='newAnswer'
							value={newAnswer}
							onChange={(e) => setNewAnswer(e.target.value)}
							disabled={loading}
						/>
						<button onClick={handleAnswer} disabled={loading}>Submit Answer!</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Question;
