import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import Alert from '../services/alert';

 class GuardLogin extends Component{

	componentDidMount()
	{
		this.triggerError();
	}
	triggerError()
	{
	    this.child.throwAlert('You have to be logged!');
	}
	render(){
	return(
		<div>
		<Redirect to={{ pathname: '/login' }} />
		<Alert ref={element => {this.child = element}}/>
		</div>
		)
	}
}

export default GuardLogin;