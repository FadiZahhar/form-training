import React, { Component } from 'react'
import './App.css';

import Home from './components/home/home';


class App extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Home />
    )
  }

}

export default App;
