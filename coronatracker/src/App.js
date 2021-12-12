import React, {Component} from 'react';
import './App.css';

//material ui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import FlagIcon from "./flagIcon";

//ApexCharts library
import Chart from "react-apexcharts";

//Card Components (child)
import Card from "./components/card";

class App extends Component{

  constructor(props){
    super(props);
    // for fourteenDaysSelection, 0 = bar chart, 1 = area chart, 2 = line chart
    this.state = {
      fourteenSelection:0
    }
  }

  renderNavBar = () =>{
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">CoronaTracker</a>
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

  renderOverView = () =>{
    return(
      <div className="row">
        <div className="col-auto mr-auto">
          <h5><strong> <FlagIcon code={"lb"} /> Lebanon Overview</strong></h5>
        </div>

        <div className="col-auto d-flex">
          <p>Share:</p>
          <FacebookIcon className="fb" />
          <TwitterIcon className="twitter" />
        </div>
      </div>
    )
  }

  renderStats = () =>{
    return(
      <div className="row text-center">
        <div className="col-4">
          <h4 className="txtRed">675,765</h4>
          <p className="txtGray bolded">Confirmed</p>
          <p className="subtitle txtRed upMargin-15 bolded">+0 new cases</p>
        </div>

        <div className="col-4">
          <h4 className="txtGreen">634,994</h4>
          <p className="txtGray bolded">Recovered</p>
        </div>

        <div className="col-4">
          <h4 className="txtGray">8,755</h4>
          <p className="txtGray bolded">Dead</p>
          <p className="subtitle txtGray upMargin-15 bolded">+0 new deaths</p>
        </div>
      </div>
    )
  }

  renderFatalityCard = () =>{

    let series = [8755,675765];
    let deadPercent = series[0] / series[1] * 100;
    let options = {
      legend:{
        show:false
      },

      dataLabels:{
        enabled:false
      },

      plotOptions:{
        pie: {
          startAngle: 0,
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
          }
        }
      },

      fill: {
        colors: ['rgb(255, 154, 178)', 'rgb(204, 204, 204)']
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
          filter: {
            type: 'none',
            value: 0,
          }
        }
      },

      chart: {
        selection: {
          enabled: false,
        },
        offsetY: -10
      },

      title: {
        text: deadPercent.toFixed(1)+"%",
        align: 'center',
        margin: 10,
        offsetX: 0,
        offsetY: 55,
        floating: true,
        style: {
          fontSize:  '20px',
          fontWeight:  300,
          fontFamily:  'Arial',
          color:  '#263238'
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
          fontSize:  '9px',
          fontWeight:  'normal',
          fontFamily:  undefined,
          color:  '#9699a2'
        },
      }

    };

    return(
      <div className="row align-items-center no-gutters" style={{height: "100%"}}>
        <div className="col-lg-6 col-md-6">
          <Chart options={options} series={series} type="donut" width="100%" height="150px" />
        </div>
        <div className="col-lg-6 col-md-6 text-center">
          <p style={{fontSize: 14}}><strong>Fatality Rate</strong></p>
        </div>
      </div>
    )
  }

  renderRecoveryCard = () =>{

    let series = [40771,675765];
    let recoverPercent = series[0] / series[1] * 100;


    let options = {
      legend:{
        show:false
      },

      dataLabels:{
        enabled:false
      },

      plotOptions:{
        pie: {
          startAngle: 0,
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
          }
        }
      },

      fill: {
        colors: ['rgb(204, 204, 204)', 'rgb(77, 175, 247)']
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
          filter: {
            type: 'none',
            value: 0,
          }
        }
      },

      chart: {
        selection: {
          enabled: false,
        },
        offsetY: -10
      },

      title: {
        text: "94%",
        align: 'center',
        margin: 10,
        offsetX: 0,
        offsetY: 55,
        floating: true,
        style: {
          fontSize:  '20px',
          fontWeight:  300,
          fontFamily:  'Arial',
          color:  '#263238'
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
          fontSize:  '9px',
          fontWeight:  'normal',
          fontFamily:  undefined,
          color:  '#9699a2'
        },
      }

    };

    return(
      <div className="row align-items-center no-gutters" style={{height: "100%"}}>
        <div className="col-lg-6 col-md-6">
          <Chart options={options} series={series} type="donut" width="100%" height="150px" />
        </div>
        <div className="col-lg-6 col-md-6 text-center">
          <p style={{fontSize: 14}}><strong>Recovery Rate</strong></p>
        </div>
      </div>
    )
  }

  renderFirstThreeCards = () =>{
    return(
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-10 paddingHorizontal5">
          <Card>
            {this.renderOverView()}
            {this.renderStats()}
          </Card>
        </div>

        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 mb-10 paddingHorizontal5">
          <Card card={{height: "100%"}} cardBody={{padding:0}}>
            {this.renderFatalityCard()}
          </Card>
        </div>

        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 mb-10 paddingHorizontal5">
          <Card card={{height: "100%"}} cardBody={{padding:0}}>
            {this.renderRecoveryCard()}
          </Card>
        </div>
      </div>
    )
  }

  renderSecondThreeCardsBG = (id, title, stat, description) =>{
    //chart data
    //return chart component, and also accept 3 parameters 
    //do positioning on the data and the chart.

    let options = {
      chart: {
        id: id,

        toolbar: {
          show: false
        },

        zoom: {
          enabled: false
        }
      },

      dataLabels: {
        enabled: false
      },

      xaxis: {
        labels:{
          show: false,
          minHeight: 0,
          maxHeight: 0
        },
        axisTicks: {
          show: false
        }
      },

      yaxis: {
        show: false,
        labels: {
          show: false,
        }
      },

      grid: {
        show: false
      },

      

      markers: {
        size: 0
      },

      stroke: {
        show: true,
        curve: 'smooth',
        colors:  ["rgb(0, 180, 251)"]
      },

      tooltip: {
        enabled: false
      },

      fill: {
        colors: ["rgb(0, 143, 251)"],
        opacity: 0.9
      }

    };
    let series = [
      {
        name: "series-1",
        data: [0, 30, 40, 70, 30, 100, 50, 120, 130, 160]
      }
    ] 

    return(
      <div>
        <p style={{position:"absolute", top: 15, left: 15}}><strong>{title}</strong></p>
        <p style={{position:"absolute", top: 55, left: 15, fontSize: 25}}><strong>{stat}</strong></p>
        <div style={{position: "absolute", bottom: 20, left: 15, zIndex: 1, color: "#4a5568"}}>{description}</div>
        <Chart options={options} series={series} type="area" width="100%" height="100%" style={{position: "relative", right: -10, bottom: -4 }}/>
      </div>
    )
  }

  renderSecondThreeCards = () =>{
    return(
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-10 paddingHorizontal5">
          <Card cardBody={{padding:0}}>
          {this.renderSecondThreeCardsBG("cardcardOneInSecondSection", "Critical Cases treated in ICU", 168, <p><span style={{color: "red"}}>0.0%</span> of total cases</p>)}
          </Card>
        </div>

        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-10 paddingHorizontal5">
          <Card cardBody={{padding:0}}>
          {this.renderSecondThreeCardsBG("cardcardTwoInSecondSection", "Daily Cases Receiving Treatment", 35032, <p><span style={{color: "red"}}>5.2%</span> of total cases</p>)}
          </Card>
        </div>

        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-10 paddingHorizontal5">
          <Card cardBody={{padding:0}}>
          {this.renderSecondThreeCardsBG("cardcardThreeInSecondSection", "Daily Confirmed Cases", 100090, <p>Per Million Population</p>)}
          </Card>
        </div>
      </div>
    )
  }

  renderFourteenDaysChart = (type) =>{
    let series =[{
      name: 'Confirmed Cases',
      data: [44, 55, 41, 67, 22, 43, 44, 55, 41, 67, 22, 43, 43, 43]
    }, {
      name: 'Recovered Cases',
      data: [13, 23, 20, 8, 13, 27, 26, 13, 23, 20, 8, 13, 27, 26]
    }, {
      name: 'Death',
      data: [11, 17, 15, 15, 21, 14, 27, 11, 17, 15, 15, 21, 14, 27]
    }];


    let options = {
      chart: {
      stacked: type==="bar"?true:false,
      toolbar: {
        show: false
      },
      
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      bar: {
        horizontal: false
      },
    },
    xaxis: {
      type: 'datetime',
      categories: ['01/01/2021 GMT', '01/02/2021 GMT', '01/03/2021 GMT', '01/04/2021 GMT',
        '01/05/2021 GMT', '01/06/2021 GMT', '01/07/2021 GMT', '01/08/2021 GMT', '01/09/2021 GMT', '01/10/2021 GMT', '01/11/2021 GMT', '01/12/2021 GMT', '01/13/2021 GMT', '01/14/2021 GMT'
      ],
    },
    yaxis: {
      opposite: true
    },
    legend: {
      position: 'bottom',
    },
    fill: {
      opacity: 1
    },
    colors: ['rgba(0, 143, 251, 0.85)', 'rgba(0, 227, 150, 0.85)', 'rgba(254, 176, 25, 0.85)'],
    grid:{
      show: false
    },
    stroke: {
      curve: "smooth"
    }
    };

    return(
      <Chart series={series} options={options} width="100%" height="340" type={type} />
    )
  }

 

  renderThirdLargeCard = () =>{
    let {fourteenSelection} = this.state;


    return(
      <div className="row">
        <div className="col mb-10 paddingHorizontal5">
         <Card>
            <h5><strong>Past 14 Days Chart</strong></h5>
            <div className="dropdown show">
              <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {fourteenSelection === 0 && "Bar Chart"}
                {fourteenSelection === 1 && "Area Chart"}
                {fourteenSelection === 2 && "Line Chart"}
              </a>

              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a className="dropdown-item" onClick={(e)=>this.setState({fourteenSelection:0})}>Bar</a>
                <a className="dropdown-item" onClick={(e)=>this.setState({fourteenSelection:1})}>Area</a>
                <a className="dropdown-item" onClick={(e)=>this.setState({fourteenSelection:2})}>Line</a>
              </div>
            </div>
            {fourteenSelection === 0 && this.renderFourteenDaysChart("bar")}
            {fourteenSelection === 1 && this.renderFourteenDaysChart("area")}
            {fourteenSelection === 2 && this.renderFourteenDaysChart("line")}
          </Card>
        </div>

      </div>
    )
  }

  renderForthLargeCard = () =>{
    return(
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

  render(){
    return(
     <div>
       {this.renderNavBar()}
       <br/>
        <div className="container padding-10">
          {this.renderFirstThreeCards()}
          {this.renderSecondThreeCards()}
          {this.renderThirdLargeCard()}
          {this.renderForthLargeCard()}
        </div>
     </div>
    )
  }
}


export default App;
