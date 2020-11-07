import React, { Component } from 'react';
import login from './login.svg';
import API from '../../config/env';
import token from '../../services/token';
import './login.css';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

class Login extends Component 
{
	constructor() 
  {
    super();
    this.state = {
        mail:'',
        pass:'',
        error: '',
        blocking: false
    };
    
    this.toggleBlocking = this.toggleBlocking.bind(this);
    this.sendData = this.sendData.bind(this);
    this.changeMail = this.changeMail.bind(this);
    this.changePass = this.changePass.bind(this);
  }
  render()
  {
    return (
      <div className="wrapper">
      <BlockUi tag="div" blocking={this.state.blocking}>
		  <div id="formContent">
		    <div >
		      <img src={login} id="icon" alt="User Icon" />
		    </div>
		    <form onSubmit={this.sendData}>
		      <input className="login-input" type="email" id="login" value={this.state.mail} onChange={this.changeMail} placeholder="email" required/>
		      <input className="login-input" type="password" id="password" value={this.state.pass} onChange={this.changePass} placeholder="password" required/>
		      <input className="login-input" type="submit" value="Log In" />
		    </form>
		  </div>
      </BlockUi>
		</div>
    );
  }
  async sendData(e) 
  {
    this.toggleBlocking();
    e.preventDefault();
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ mail: this.state.mail, pass: this.state.pass })
    };
    const res = await fetch(API.URL+'/auth/login', requestOptions);
      const data = await res.json();
      if(res.status === 200)
      { 
        token.saveData(data['user']['token'],data['user']['data'].id,data['user']['data'].balance);
        this.redirect();
      }
      else
      {
        this.toggleBlocking();
         alert(data.message);
      };
}

  toggleBlocking() {
    this.setState({blocking: !this.state.blocking});
  }
  redirect(){
    this.props.history.push('/products');
  }
  changeMail(e)
  {
    this.setState( 
    {
      mail: e.target.value
    })
  }
   changePass(e)
   {
    this.setState( 
    {
      pass: e.target.value
    })
  }
}

export default Login;