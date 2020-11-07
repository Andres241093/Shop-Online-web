import React, { Component } from 'react';
import {BrowserRouter as Router, withRouter}  from "react-router-dom";
import token from '../../services/token';
import Logout from './logout.svg';
import './header.css';

class Header extends Component 
{
	constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.logout = this.logout.bind(this);
    }

	handleClick(){
		let path = this.props.history.location.pathname;
		if(path === '/sign_up')
		{
			this.props.history.push('/login');
		}
		if(path === '/login')
		{
			this.props.history.push('/sign_up');
		}
	}
	logout(){
		token.deleteData();
		this.props.history.push('/login');
	}
	render(){
	    return (
	      <div>
		    <Router>
		      	<header className="items">
			      	{
				        {
				          '/sign_up': 
				          	<button className="btn-header" onClick={this.handleClick}>
							  <span>Login</span>
							</button>
				          	,
				          '/login': 
				          	<button className="btn-header" onClick={this.handleClick}>
							  <span>Sign up</span>
							</button>
						   	,
						   	'/products': 
				          	<button className="btn-header" onClick={this.logout}>
							 <img src={Logout} className="logout" />
							</button>
				        }[this.props.history.location.pathname]
				    }
					
		      	</header>
		    </Router>
	      </div>
	    );
	}
}

export default withRouter(Header);