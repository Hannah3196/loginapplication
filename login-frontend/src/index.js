import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route,BrowserRouter as Router } from 'react-router-dom'
import Login from './module/Login';
import Register from './module/Register';
import Profile from './module/Profile';
const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Login} />
      {/* <Route path="/login" component={Login} /> */}
      <Route path="/register" component={Register} />
      <Route path="/profile" component={Profile} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
