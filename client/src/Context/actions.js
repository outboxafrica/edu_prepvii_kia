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

		console.log('data received by client ==>')
		console.log(data)

		if (data.username) {
			dispatch({ type: 'LOGIN_SUCCESS', payload: data });
			localStorage.setItem('currentUser', JSON.stringify(data));
			return data;
		}

		dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
		console.log(data.errors[0]);
		return;
	} catch (error) {
		dispatch({ type: 'LOGIN_ERROR', error: error });
		console.log(error);
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
			// localStorage.setItem('currentUser', JSON.stringify(data));
			return data;
		}

		dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
		console.log(data.errors[0]);
		return;
	} catch (error) {
		dispatch({ type: 'LOGIN_ERROR', error: error });
		console.log(error);
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
		headers: { 'Content-Type': 'application/json' },
	}
	dispatch({ type: 'GET_ALL_QUESTIONS' })

}
