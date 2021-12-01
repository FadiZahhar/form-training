import React, { Component } from 'react'
import './App.css';

//material ui icons
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

import FlagIcon from './flagIcon';

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

  renderOverView = () => {
    return (
      <div className="row">
        <div className="col-auto mr-auto">
          <h6><strong> <FlagIcon code={"my"} /> Malaysia Overview</strong></h6>
        </div>
        <div className="col-auto">
          <h6>Share: <FacebookIcon className="fb" /> <TwitterIcon className="twitter" /> </h6>
        </div>
      </div>
    )
  }
  renderStats = () => {
    return (
      <div className="row text-center">
        <div className="col-4">
          <h4 className="txtRed">7,059</h4>
          <p className="txtGray bolded">Confirmed</p>
          <p className="subtitle txtRed upMargin15">+50 new cases</p>
        </div>
        <div className="col-4">
          <h4 className="txtGreen">5796</h4>
          <p className="txtGray bolded">Recovered</p>
        </div>
        <div className="col-4">
          <h4 className="txtGray">114</h4>
          <p className="txtGray bolded">Dead</p>
          <p className="subtitle txtRed upMargin15">+0 new deaths</p>
        </div>
      </div>
    )
  }
  renderFirstThreeCards = () => {
    return (
      <div className="row">
        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 mb-10 paddingHorizontal5">
          <div className="card">
            <div className="card-body">
              {this.renderOverView()}
              {this.renderStats()}
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-6 col-xs-12 mb-10 paddingHorizontal5">
          <div className="card">
            <div className="card-body">

            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-6 col-xs-12 mb-10 paddingHorizontal5">
          <div className="card">
            <div className="card-body">

            </div>
          </div>
        </div>
      </div>
    )
  }

  renderSecondThreeCards = () => {
    return (
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-10 paddingHorizontal5">
          <div className="card">
            <div className="card-body">

            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-10 paddingHorizontal5">
          <div className="card">
            <div className="card-body">

            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-10 paddingHorizontal5">
          <div className="card">
            <div className="card-body">

            </div>
          </div>
        </div>
      </div>
    )
  }

  renderThirdLargeCard = () => {
    return (
      <div className="row">
        <div className="col mb-10 paddingHorizontal5">
          <div className="card">
            <div className="card-body">

            </div>
          </div>
        </div>
      </div>
    )
  }
  renderFourthLargeCard = () => {
    return (
      <div className="row">
        <div className="col mb-10 paddingHorizontal5">
          <div className="card">
            <div className="card-body">

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
        <div className="container padding-10">
          {this.renderFirstThreeCards()}
          {this.renderSecondThreeCards()}
          {this.renderThirdLargeCard()}
          {this.renderFourthLargeCard()}
        </div>
      </div>





    )
  }

}

export default App;
