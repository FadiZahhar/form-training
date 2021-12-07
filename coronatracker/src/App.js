import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/home/home';
import Country from './components/country/country';
import Login from './components/login/login';
import Register from './components/register/register';


class App extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/country/:id" component={Country} />
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>

          </Switch>
        </Router>
      </>
    )
  }

}

export default App;
