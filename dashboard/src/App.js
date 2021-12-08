
import React, { Component} from 'react';
import './App.css';

import Home from "./components/home/home";
import Country from "./components/country/country";

//new form for react-router-dom 
// Switch to Routes 
import { BrowserRouter, Routes , Route, useParams } from 'react-router-dom'



class App extends Component{
  constructor (props){
    super(props);
  }


  render () {
    return (
      <BrowserRouter>
        <div>
      <Routes>
        <Route path="/" element={<Home/>}>
      
        </Route>
        
        <Route path="country/:id" element={<Country/>}/>

        <Route path="/dashboard" element={<Home/>}>
          
        </Route>
      </Routes>
      </div>
    </BrowserRouter>
    )
  }


}


export default App;
