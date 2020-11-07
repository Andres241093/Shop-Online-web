import React, { Component } from 'react';
import API from '../../config/env';
import './create.css';
import Alert from '../../services/alert';

class Create extends Component 
{
  constructor() 
  {
    super();
    this.state = ({
        mail:'',
        pass:''
      });
    this.sendData = this.sendData.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeSurname = this.changeSurname.bind(this);
    this.changeMail = this.changeMail.bind(this);
    this.changePass = this.changePass.bind(this);
  }
  render()
  {
    return (
	    <div>
        <Alert ref={element => {this.child = element}}/>
		    <div className="title-elements">
				<h1>Sign in</h1>
			</div>
			<hr/>
			<form className="padding" onSubmit={this.sendData}>
				<div className="column">
					<div className="row">
						<label className="column-name">
							<span>Name</span>
							<input type="text" value={this.state.name} onChange={this.changeName} name="" placeholder="name" required/>
						</label>
						<label className="column-surname">
							<span>Surname</span>
							<input type="text" value={this.state.surname} onChange={this.changeSurname} placeholder="surname" required/>
						</label>
					</div>
					<label className="column">
						<span>Email</span>
						<input type="email" className="cls" value={this.state.mail} onChange={this.changeMail} placeholder="email" required/>
					</label>
					<label className="column">
						<span>Password</span>
						<input type="password" className="cls" value={this.state.pass} onChange={this.changePass} placeholder="password" required/>
					</label>
				</div>
				<input type="submit" value="Save"/>
			</form>
      </div>
    );
  }
   sendData(e) 
   {
    e.preventDefault();
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
          name: this.state.name, 
          surname: this.state.surname,  
          mail: this.state.mail,
          balance: 100, 
          pass: this.state.pass 
        })
    };
    console.log(requestOptions)
    fetch(API.URL+'/users', requestOptions)
    .then(async response => 
    {
            const data = await response.json();
            if (!response.ok) 
            {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            this.triggerMssg('User successfully register');
            //this.props.history.push('/login');
            console.log(data);
        })
        .catch(error => 
        {
            this.setState({ errorMessage: error.toString() });
            this.triggerMssg(error);
        });
   }
  triggerMssg(mssg)
   {
    this.child.throwAlert(mssg);
  }
  changeName(e){
    this.setState( 
    {
      name: e.target.value
    })
  }
   changeSurname(e)
   {
    this.setState( {
      surname: e.target.value
    })
  }
  changeMail(e)
  {
    this.setState( {
      mail: e.target.value
    })
  }
  changePass(e)
  {
    this.setState( {
      pass: e.target.value
    })
  }
}

export default Create;