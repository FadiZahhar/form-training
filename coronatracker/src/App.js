import React, { Component } from 'react'
import './App.css';

//material ui icons
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import FlagIcon from './flagIcon';

// AppexCharts Library
import Chart from "react-apexcharts";

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
          <h6><strong> <FlagIcon code={"lb"} /> Lebanon Overview</strong></h6>
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
          <h4 className="txtRed">670,656</h4>
          <p className="txtGray bolded">Confirmed</p>
          <p className="subtitle txtRed upMargin15">+50 new cases</p>
        </div>
        <div className="col-4">
          <h4 className="txtGreen">633,299</h4>
          <p className="txtGray bolded">Recovered</p>
        </div>
        <div className="col-4">
          <h4 className="txtGray">8,725</h4>
          <p className="txtGray bolded">Dead</p>
          <p className="subtitle txtRed upMargin15">+0 new deaths</p>
        </div>
      </div>
    )
  }

  renderFatalityCard = () => {
    let series = [8725, 670656];
    let deadPercent = 8725 / series[1] * 100;
    let options = {
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          expandOnClick: false,
          offsetX: 0,
          offsetY: 0,
          customScale: 1,
          dataLabels: {
            offset: 0,
            minAngleToShowLabel: 10
          },
          donut: {
            size: '85%',
            background: 'transparent',
            labels: {
              show: false,
            }
          },
        }
      },
      fill: {
        colors: ['rgba(255,154,178)', 'rgba(204,204,204)']
      },
      tooltip: {
        enabled: false
      },

      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          }
        },
        hover: {
          filter: {
            type: 'none',
            value: 0,
          }
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0,
          }
        },
      },
      chart: {
        selection: {
          enabled: false,
        },
        offsetY: -10
      },
      title: {
        text: deadPercent.toFixed(1) + "%",
        align: 'center',
        margin: 10,
        offsetX: 0,
        offsetY: 55,
        floating: true,
        style: {
          fontSize: '20px',
          fontWeight: 300,
          fontFamily: "Arial",
          color: '#263238'
        },
      },
      subtitle: {
        text: "OF TOTAL CASES",
        align: 'center',
        margin: 10,
        offsetX: 0,
        offsetY: 85,
        floating: true,
        style: {
          fontSize: '9px',
          fontWeight: 'normal',
          fontFamily: "Arial",
          color: '#9699a2'
        },
      }

    }
    return (
      <div className="row align-items-center no-gutters" style={{ height: "100%" }}>
        <div className="col-lg-6 col-md-6">
          <Chart options={options} series={series} type="donut" width="100%" height="150px" />
        </div>
        <div className="col-lg-6 col-md-6 text-center">
          <p className="chartTitle"> <strong>Fatality Rate</strong> </p>
        </div>
      </div>
    )
  }

  renderRecoveryCard = () => {
    let series = [37357, 670656];
    let recoverPercent = series[0] / series[1] * 100;
    let options = {
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          expandOnClick: false,
          offsetX: 0,
          offsetY: 0,
          customScale: 1,
          dataLabels: {
            offset: 0,
            minAngleToShowLabel: 10
          },
          donut: {
            size: '85%',
            background: 'transparent',
            labels: {
              show: false,
            }
          },
        }
      },
      fill: {
        colors: ['rgba(204,204,204)', 'rgba(77,175,247)']
      },
      tooltip: {
        enabled: false
      },

      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          }
        },
        hover: {
          filter: {
            type: 'none',
            value: 0,
          }
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0,
          }
        },
      },
      chart: {
        selection: {
          enabled: false,
        },
        offsetY: -10
      },
      title: {
        text: recoverPercent.toFixed(1) + "%",
        align: 'center',
        margin: 10,
        offsetX: 0,
        offsetY: 55,
        floating: true,
        style: {
          fontSize: '20px',
          fontWeight: 300,
          fontFamily: "Arial",
          color: '#263238'
        },
      },
      subtitle: {
        text: "OF TOTAL CASES",
        align: 'center',
        margin: 10,
        offsetX: 0,
        offsetY: 85,
        floating: true,
        style: {
          fontSize: '9px',
          fontWeight: 'normal',
          fontFamily: "Arial",
          color: '#9699a2'
        },
      }

    }
    return (
      <div className="row align-items-center no-gutters" style={{ height: "100%" }}>
        <div className="col-lg-6 col-md-6">
          <Chart options={options} series={series} type="donut" width="100%" height="150px" />
        </div>
        <div className="col-lg-6 col-md-6 text-center">
          <p className="chartTitle"> <strong>Recovery Rate</strong> </p>
        </div>
      </div>
    )
  }

  renderFirstThreeCards = () => {
    return (
      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-10 paddingHorizontal5">
          <div className="card">
            <div className="card-body">
              {this.renderOverView()}
              {this.renderStats()}
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-10 paddingHorizontal5">
          <div className="card" style={{ height: "100%" }}>
            <div className="card-body" style={{ padding: 0 }}>
              {this.renderFatalityCard()}
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-10 paddingHorizontal5">
          <div className="card" style={{ height: "100%" }}>
            <div className="card-body" style={{ padding: 0 }}>
              {this.renderRecoveryCard()}
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
