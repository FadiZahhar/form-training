
import React, { Component} from 'react';
import './App.css';

//Material ui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import FlagIcon from './flagIcon';

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
                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 nb-10 paddingHorizontal5 ">
                  <div className="card">
                    <div className="card-body">
                      {this.renderOverview()}
                      {this.renderStats()}
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-6 col-xs-12 nb-10 paddingHorizontal5">
                  <div className="card " style={{height:"100%"}}>
                    <div className="card-body">
                      {this.renderFatalityCard()}
                      
                     
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-6 col-xs-12  nb-10 paddingHorizontal5">
                  <div className="card">
                    <div className="card-body">
                      
                      
                    </div>
                  </div>
                </div>
              </div>
           
    )
  }
  renderSecondThreeCard = () =>{
    return(
      <div className="row">
      <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 nb-10 paddingHorizontal5">
        <div className="card">
          <div className="card-body">
            
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 nb-10 paddingHorizontal5">
        <div className="card">
          <div className="card-body">

          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 nb-10 paddingHorizontal5">
        <div className="card">
          <div className="card-body">

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
    return(
      <div className="row">
        <div className="col-auto">
        <p><strong>Fatality Rate</strong></p>
        </div>
        <div className="col-auto">
          <p><strong>Fatality Rate</strong></p>
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
