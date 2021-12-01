
import React, { Component} from 'react';
import './App.css';

//Material ui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import FlagIcon from './flagIcon';


import Chart from "react-apexcharts";
class App extends Component{
  renderNav =()=>{
    return(

  <nav className="navbar navbar-expand-lg navbar-dark  bg-dark">
    <div>
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <a className="nav-link active" aria-current="page" href="/">Home</a>

      </div>
    </div>
  </div>
  </div>
</nav>
    )
  }
  renderOverview = ()=>{
    return(
      
      <div className="row ">
        <div className="col-auto mr-auto">
          <h6><strong><FlagIcon code={"my"} size={20} />Malaysia Overview</strong></h6>
        </div>
        <div className="col-auto ">
          <p>Share: <FacebookIcon className="fa"/><TwitterIcon className="twitter"/></p>
        </div>

      </div>
      
    )
  }

  renderStats=()=>{
    return(
      <div className="row text-center">
        <div className="col-4">
          <h4 className="textGreen">7,059</h4>
          <p className="textGray bolded">Confirmed</p>
          <p className="subtitle textRed upMargin-15">+50 new cases</p>
        </div>
        <div className="col-4 ">
          <h4 className="textRed">5796</h4>     
          <p className="textGray bolded">Recovered</p>
        </div>
        <div className="col-4 ">
          <h4 className="textGray">7,059</h4>      
          <p className="textGray bolded">Dead</p>
          <p className="subtitle textGray upMargin-15">+0 new deaths</p>
        </div>
      </div>
    )
  }
  renderFirstThreeCard =()=>{
    return(
                      
              <div className="row">
                <div className="col-lg-6 col-md-8 col-sm-12 col-xs-12 nb-10 paddingHorizontal5 ">
                  <div className="card">
                    <div className="card-body">
                      {this.renderOverview()}
                      {this.renderStats()}
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-2 col-sm-6 col-xs-12 nb-10 paddingHorizontal5">
                  <div className="card " style={{height:"100%"}}>
                    <div className="card-body" style={{padding:0}}>
                      {this.renderFatalityCard()}
                      
                     
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-2 col-sm-6 col-xs-12  nb-10 paddingHorizontal5">
                  <div className="card" style={{height:"100%"}}>
                    <div className="card-body" >
                      {this.renderRecoveryCard()}
                      
                    </div>
                  </div>
                </div>
              </div>
           
    )
  }
  renderSecondThreeCardBG =(title,number,paragraphe)=>{
    let options={
      chart:{
        toolbar:{
          show:false,
        },
        zoom: {
          enabled: false,
        }

      },
      xaxis:{
        labels:{
          show:false,
          minHeight: 0,
          maxHeight: 0,
        }
      },
      yaxis:{
        labels:{
          show:false,
          minHeight: 0,
          maxHeight: 0,
        }
      },
      grid: {
        show: false,
      },
      markers: {
        size: 0,
      },
      stroke: {
        show: true,
        curve: 'smooth',
      
    },
    dataLabels: {
      enabled: false,
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
              type: 'lighten',
              value: 0.15,
          }
      },
      active: {
          
          filter: {
              type: 'darken',
              value: 0.35,
          }
      },
  },
  tooltip: {
    enabled: false,
  }



    };
    let series=[{data:[0, 30, 40, 60 , 70, 30,90,120,130,180 ]}];
    return(
        <div>
          <p style={{position:"absolute",top:15,left:15}}><strong>{title}</strong></p>
          <p style={{position:"absolute",top:55,left:15,fontSize:25}}><strong>{number}</strong></p>
            {paragraphe}
            <Chart
    options={options}
    series={series}
    type="area"
    width="100%"
    height="100%"
    style={{position:"relative",right:-10,bottom:-5}}
  />

        </div>
    )
  }
  renderSecondThreeCard = () =>{
    return(
      <div className="row">
      <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 nb-10 paddingHorizontal5">
        <div className="card">
          <div className="card-body" style={{padding:0}}>
            {this.renderSecondThreeCardBG("critical cases treated in ICU",5,<p style={{position:"absolute",bottom:15,left:15,zIndex:9999,color:'#4a5568'}}><span style={{color: "red"}}>0.1%</span> of total cases</p>)}
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 nb-10 paddingHorizontal5">
        <div className="card">
          <div className="card-body"style={{padding:0}}>
          {this.renderSecondThreeCardBG("Daily cases receving treatments",1531,<p style={{position:"absolute",bottom:15,left:15,zIndex:9999}}><span style={{color: "red"}}>18.4%</span> of total cases</p>)}
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 nb-10 paddingHorizontal5">
        <div className="card">
          <div className="card-body"style={{padding:0}}>
          {this.renderSecondThreeCardBG("Daily confirmed cases",257,<p style={{position:"absolute",bottom:15,left:15,zIndex:9999}}>Per Millin population</p>)}
          </div>
        </div>
      </div>
    </div>
    )
  }
  renderThirdLargeCard = () =>{
    return(
      <div className="row">
        <div className="col nb-10 paddingHorizontal5">
          <div className="card">
            <div className="card-body">

            </div>
          </div>
        </div>

    </div>
    )
  }
  renderforthLargeCard = () =>{
    return(
      <div className="row">
        <div className="col nb-10 paddingHorizontal5">
          <div className="card">
            <div className="card-body">

            </div>
          </div>
        </div>

    </div>
    )
  }

  renderFatalityCard =()=>{

    let series = [117,8322];
    let recoverperson = series[0]/ series[1]*100;
    let options={
      legend:{
        show:false
      },
      dataLabels:{
        enabled:false
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
              name: {
                show: true,
                }
              },

            }
          },      
        },
        fill: {
          colors: ['rgb(255,154,178)', 'rgb(204,204,204)']
        },
        tooltip:{
          enabled:false
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
                  type: 'lighten',
                  value: 0.,
              }
          },
          active: {
              allowMultipleDataPointsSelection: false,
              filter: {
                  type: 'darken',
                  value: 0.,
              }
          },
      },
      chart: {
        selection: {
          enabled: false,

        },
        offsetY:-10
      },
      
      
title: {
  text: recoverperson.toFixed(1)+"%",
  align: 'center',
  margin: 10,
  offsetX: 0,
  offsetY: 55,
  floating: true,
  style: {
    fontSize:  '14px',
    fontWeight:  33,
    fontFamily:  undefined,
    color:  '#263238'
  },
},
subtitle: {
  text: "of total cases",
  align: 'center',
  margin: 10,
  offsetX: 0,
  offsetY: 75,
  floating: true,
  style: {
    fontSize:  '12px',
    fontWeight:  'normal',
    fontFamily:  undefined,
    color:  '#9699a2'
  },
}
    };
    
    return(
      <div className="row align-items-center no-gutters" style={{height:"100%"}}>
        <div className="col-lg-6 col-md-6">
        <Chart options={options} series={series} type="donut" width="100%" height="150px"/>
        </div>
        <div className="col-lg-6 col-md-6 text-center">
          <p className="charTitle"><strong>Fatality Rate</strong></p>
        </div>

      </div>
    )
  }
  renderRecoveryCard =()=>{
    
    let series = [6674,8322];
    
    let deadperson = series[0]/ series[1]*100;
    let options={
      legend:{
        show:false
      },
      dataLabels:{
        enabled:false
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
              name: {
                show: true,
                }
              },

            }
          },      
        },
        fill: {
          colors: ['rgb(204,204,204)','rgb(77,175,247)' ]
        },
        tooltip:{
          enabled:false
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
                  type: 'lighten',
                  value: 0.,
              }
          },
          active: {
              allowMultipleDataPointsSelection: false,
              filter: {
                  type: 'darken',
                  value: 0.,
              }
          },
      },
      chart: {
        selection: {
          enabled: false,

        },
        offsetY:-10
      },
      
      
title: {
  text: deadperson.toFixed(1)+"%",
  align: 'center',
  margin: 10,
  offsetX: 0,
  offsetY: 55,
  floating: true,
  style: {
    fontSize:  '14px',
    fontWeight:  33,
    fontFamily:  undefined,
    color:  '#263238'
  },
},
subtitle: {
  text: "of total cases",
  align: 'center',
  margin: 10,
  offsetX: 0,
  offsetY: 75,
  floating: true,
  style: {
    fontSize:  '12px',
    fontWeight:  'normal',
    fontFamily:  undefined,
    color:  '#9699a2'
  },
}
    };
    
    return(
      <div className="row align-items-center no-gutters" style={{height:"100%"}}>
        <div className="col-lg-6 col-md-6">
        <Chart options={options} series={series} type="donut" width="100%" height="150px"/>
        </div>
        <div className="col-lg-6 col-md-6 text-center">
          <p className="charTitle"><strong>Recovery rate</strong></p>
        </div>

      </div>
    )
  }

  render(){
    return(
        <div >

              {this.renderNav()}
              <br/>
              <div className="container padding-10">
              {this.renderFirstThreeCard()}
              {this.renderSecondThreeCard()}
              {this.renderThirdLargeCard()}
              {this.renderforthLargeCard()}
              </div>
          

        </div>
      
    )
  }
}


export default App;
