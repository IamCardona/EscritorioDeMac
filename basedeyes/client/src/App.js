import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Home from './components/dashboard/Home'

import FormAddClient from './components/dashboard/FormAddClient'
import TableClients  from './components/dashboard/TablaClients'
import Update from './components/dashboard/Update'
import Delete from './components/dashboard/delete'
import InfComplete from './components/dashboard/InfComplete'
import Comentarios from './components/dashboard/Comentarios'

import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Home} />
              <PrivateRoute exact path="/add" component={FormAddClient} />
              <PrivateRoute exact path="/table" component={TableClients} />
              <PrivateRoute exact path="/update/:id" component={Update} />
              <PrivateRoute exact path="/delete/:id" component={Delete} />
              <PrivateRoute exact path="/show/:id" component={InfComplete} />
              <PrivateRoute exact path="/comentarios" component={Comentarios} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
