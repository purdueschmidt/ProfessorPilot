import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Security, SecureRoute } from '@okta/okta-react';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Courses from './components/pages/Courses';
import Professors from './components/pages/Professors';
import Discussions from './components/pages/Discussions';

import './App.css';

function onAuthRequired({ history }) {
  history.push('/login');
}

class App extends Component{
  render() {
    return (
      <Router>
        <Security
          issuer="https://dev-92068440.okta.com/oauth2/default"
          client_id="0oa8ma862bPmOHB9U5d7"
          redirect_uri={window.location.origin + '/implicit/callback'}
          onAuthRequired={onAuthRequired}>
        <div className="App">
          <Navbar/>
          <div className='container'>
            
            <Route path="/" exact={true} component={Home}/>
            <SecureRoute path="/courses" exact={true} component={Courses}/>
            <Route
                path="/login"
                render={() => (
                  <Login baseUrl="https://dev-92068440.okta.com" />
                )}
              />
              <Route path="/implicit/callback" component={ImplicitCallback} />
            <Route path="/professors" exact={true} component={Professors}/>
            <Route
                path="/login"
                render={() => (
                  <Login baseUrl="https://dev-92068440.okta.com" />
                )}
              />
              <Route path="/implicit/callback" component={ImplicitCallback} />
            <Route path="/discussions" exact={true} component={Discussions}/>
            <Route
                path="/login"
                render={() => (
                  <Login baseUrl="https://dev-92068440.okta.com" />
                )}
              />
              <Route path="/implicit/callback" component={ImplicitCallback} />
            
          </div>
        </div>
        </Security>
      </Router>
    );
  }
}

export default App;
