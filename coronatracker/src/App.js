import React, { Component } from 'react'
import './App.css';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Home from './components/home/home';
import Country from './components/country/country';


class App extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <>
        <Routes>
          <Route path="/" >
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Home />} />
            <Route path="country" element={<Country />} />
          </Route>
        </Routes>

      </>
    )
  }

}

export default App;
