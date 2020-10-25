import React, { useState, useReducer } from 'react';

let user = localStorage.getItem('currentUser')
	? JSON.parse(localStorage.getItem('currentUser')).username
	: '';
let token = localStorage.getItem('currentUser')
	? JSON.parse(localStorage.getItem('currentUser')).userToken
	: '';

export const initialState = {
	user: '' || user,
	token: '' || token,
	loading: false,
	errorMessage: null,
	questions: [],
	question: [],
	answers: []
};

export const AuthReducer = (initialState, action) => {
	switch (action.type) {
		case 'REQUEST_LOGIN':
			return {
				...initialState,
				loading: true,
			};
		case 'LOGIN_SUCCESS':
			return {
				...initialState,
				user: action.payload.username,
				token: action.payload.userToken,
				loading: false,
			};
		case 'REQUEST_SIGNUP':
			return {
				...initialState,
				loading: true
			}
		case 'SIGNUP_SUCCESS':
			return {
				...initialState,
				loading: false
			}
		case 'SIGNUP_ERROR':
			return {
				...initialState,
				loading: false,
				errorMessage: action.error,
			};
		case 'LOGOUT':
			return {
				...initialState,
				user: '',
				token: '',
			};

		case 'LOGIN_ERROR':
			return {
				...initialState,
				loading: false,
				errorMessage: action.error,
			};

		case 'GET_ALL_QUESTIONS':
			return {
				...initialState,
				loading: true,
			}

		case 'GET_ALL_QUESTIONS_SUCCESS':
			return {
				...initialState,
				loading: false,
				questions: action.payload
			}
		
		case 'GET_ALL_QUESTIONS_ERROR':
			return {
				...initialState,
				loading: false,
				errorMessage: action.error,
			};
		
		case 'REQUEST_ANSWER_QUESTION':
			return {
				...initialState,
				loading: true,
			};

		case 'ANSWER_QUESTION_SUCCESS':
			return {
				...initialState,
				loading: false,
				question: action.payload.question,
				questions: action.payload.questions,
				answers: action.payload.answers,
			};

		case 'ANSWER_QUESTION_ERROR':
			return {
				...initialState,
				loading: false,
				errorMessage: action.error,
			};

		case 'OPEN_QUESTION':
			return {
				...initialState,
				loading: false,
				question: action.payload,
			};

		case 'REQUEST_ANSWERS_SUCCESS':
			return {
				...initialState,
				loading: false,
				answers: action.payload,
			};
		
		case 'REQUEST_ANSWERS_ERROR':
			return {
				...initialState,
				loading: false,
				errorMessage: action.payload,
			};

		case 'REQUEST_NEW_QUESTION':
			return {
				...initialState,
				loading: true,
			}

		case 'NEW_QUESTION_SUCCESS':
			return {
				...initialState,
				loading: false,
				questions: action.payload
			}

		case 'NEW_QUESTION_ERROR':
			return {
				...initialState,
				loading: false,
				errorMessage: action.payload
			}

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};
