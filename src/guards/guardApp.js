import React from 'react';
import { Route } from 'react-router-dom';
import GuardLogin from './guardLogin';
import isLogged from '../services/user';

export default function GuardApp(
{
	component: Component,
	path,
	isPrivate,
	...props
})
{

	return(
		<Route 
		path={path}
		render={props => 
			isPrivate && !isLogged()? (
				<GuardLogin />
				) : <Component {...props} />
		}
		{...props}
		/>
		);
}