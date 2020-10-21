import React from 'react';
import Signup from '../Pages/Signup';
import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import NotFound from '../Pages/NotFound';

const routes = [
	{
		path: '/login',
		component: Login,
		isPrivate: false,
	},
	{
		path: '/signup',
		component: Signup,
		isPrivate: false,
	},
	{
		path: '/dashboard',
		component: Dashboard,
		isPrivate: true,
	},
	{
		path: '/*',
		component: NotFound,
		isPrivate: true,
	},
];

export default routes;
