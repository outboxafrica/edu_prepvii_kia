const ROOT_URL = 'http://127.0.0.1:4000/api';

export async function loginUser(dispatch, loginPayload) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(loginPayload),
	};

	try {
		dispatch({ type: 'REQUEST_LOGIN' });
		let response = await fetch(`${ROOT_URL}/auth/login`, requestOptions);
		let data = await response.json();

		if (data.username) {
			dispatch({ type: 'LOGIN_SUCCESS', payload: data });
			localStorage.setItem('currentUser', JSON.stringify(data));
			return data;
		}

		let errorsArray = []

		data.map(error => {
			errorsArray.push(error.msg)
			return null
		})

		dispatch({ type: 'LOGIN_ERROR', error: errorsArray });
		return;
	} catch (error) {
		dispatch({ type: 'LOGIN_ERROR', error: error });
	}
}

export async function signupUser(dispatch, signupPayload) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(signupPayload),
	};

	try {
		dispatch({ type: 'REQUEST_SIGNUP' });
		let response = await fetch(`${ROOT_URL}/auth/signup`, requestOptions);
		let data = await response.json();

		if (data.email) {
			dispatch({ type: 'SIGNUP_SUCCESS' });
			return data;
		}

		let errorsArray = []

		data.map(error => {
			errorsArray.push(error.msg)
			return null
		})

		dispatch({ type: 'SIGNUP_ERROR', error: errorsArray });
		return;
	} catch (error) {
		dispatch({ type: 'SIGNUP_ERROR', error: error });
	}
}

export async function logout(dispatch) {
	dispatch({ type: 'LOGOUT' });
	localStorage.removeItem('currentUser');
	localStorage.removeItem('token');
}

export async function getAllQuestions(dispatch) {
	const requestOptions = {
		method: 'GET',
		mode: 'cors',
		headers: { 'Content-Type': 'application/json' },
	}
	
	try {
		dispatch({ type: 'GET_ALL_QUESTIONS' })
		let response = await fetch(`${ROOT_URL}/questions`, requestOptions);
		let data = await response.json()

		if (data.questions[0].textone) {
			dispatch({ type: 'GET_ALL_QUESTIONS_SUCCESS', payload: data.questions })
			dispatch({ type: 'REQUEST_ANSWERS_SUCCESS', payload: data.answers })
			return null
		}

		dispatch({ type: 'GET_ALL_QUESTIONS_ERROR', error: data })
	} catch (error) {
		dispatch({ type: 'GET_ALL_QUESTIONS_ERROR', error: error})
	}
}

export async function openQuestion(dispatch, question) {
	dispatch({ type: 'OPEN_QUESTION', payload: question })
}

export async function newQuestion(dispatch, questionPayload, token) {
	const requestOptions = {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Accept': 'application/json', 
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json' 
		},
		body: JSON.stringify(questionPayload)
	}

	try {
		dispatch({ type: 'REQUEST_NEW_QUESTION' })
		let response = await fetch(`${ROOT_URL}/questions`, requestOptions)
		let data = await response.json()

		if (data[0]._id) {
			dispatch({ type: 'NEW_QUESTION_SUCCESS', payload: data })
			return data
		}

		dispatch({ type: 'NEW_QUESTION_ERROR', payload: data })
	} catch(error) {
		dispatch({ type: 'NEW_QUESTION_ERROR', payload: error })
	}
}

export async function answerQuestion(dispatch, answerPayload, question, token) {

	const requestOptions = {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Accept': 'application/json', 
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json' 
		},
		body: JSON.stringify(answerPayload)
	}

	try {
		dispatch({ type: 'REQUEST_ANSWER_QUESTION' })
		let response = await fetch(`${ROOT_URL}/questions/${question._id}/answers`, requestOptions)

		let data = await response.json()

		if (data.questions[0].textone) {
			dispatch({ type: 'ANSWER_QUESTION_SUCCESS', payload: data })
			return data;
		}

		dispatch({ type: 'ANSWER_QUESTION_ERROR', payload: data })
	} catch(error) {
		dispatch({ type: 'ANSWER_QUESTION_ERROR', payload: error })
	}
}
