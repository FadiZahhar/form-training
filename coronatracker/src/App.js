import React, { Component } from 'react'
import './App.css';



class App extends Component {

  renderNabBar = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">CoronaTracker</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
          </ul>

        </div>
      </nav>
    )
  }
  renderHelloWorld = () => {
    return (
      <div className="row">
        <div className="col-lg-12 col-md-8 col-sm-6 col-xs-12">
          <div className="card">
            <div className="card-header">
              Featured
  </div>
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div>
        {this.renderNabBar()}
        <div className="container-fluid padding-10">
          {this.renderHelloWorld()}
        </div>
      </div>





    )
  }

}

export default App;
