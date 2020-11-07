import React, { Component } from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import Header from './shared/header/header';
import routes from './config/routes';
import GuardApp from './guards/guardApp';
import './App.css';

class App extends Component 
{
  render()
  {
    return (
        <div className="body-elements">
          <Router>
          <Header />
            <Switch>
            {this.validateRoute(routes)}
            {
              routes.map(route =>(
                <GuardApp 
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  isPrivate={route.isPrivate}
                />
              ))
            }
            </Switch>
          </Router>
        </div>
    );
  }
  validateRoute(appRoute)
  {
    let routes = [];
    console.log(appRoute);
      appRoute.forEach(route =>{
        routes.push(route.path)
      });
      let currentRoute = window.location.pathname;
        if(!routes.includes(currentRoute))
        {
          console.log('redirect to login')
          window.location.replace("/login");
        }
  }
}


export default App;
