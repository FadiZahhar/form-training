import React,{Component} from "react";
import Navbar from "../shared/navbar/navbar";
import "./style.css";
import axios from "axios";
import FlagIcon from '../../flagIcon';
import {Link} from "react-router-dom"
//Material ui icons


//Material ui icons

class Home extends Component{
  
   constructor(props){
      super(props);
      this.state = {
        country:[]
      }
    }
    componentDidMount(){
      this.fetchCountry();
    }
    fetchCountry = async () =>{
      //https instead of http
      let url = "https://api.coronatracker.com/v3/stats/worldometer/country";
      
      axios({
        method: 'get',
        url: url,
        
      }).then( (response)=> {
        if(response.status === 200 || response.status ===201)
        {
          let country = response.data;
       
          country = country.map((item,index)=>{
            let cc = ""
            if (item.countryCode){
              cc=item.countryCode.toLowerCase();
            }
            return {Code:cc,country:item.countryName, confirm:item.totalConfirmed,recovered:item.totalRecovered,deaths:item.totalDeaths};
      
          });  
          console.log(country);
          this.setState({
            country
          });

        
        }
        else{
          alert("Something happend");
        }
          console.log(response);
        
        });
        
    }
    renderCountries=()=>{
      let {country} = this.state;
      return country.map((item,index)=>{
        return(
          <tr key={index}>
              <td><Link to={"/country/" + item.Code} >{item.Code && item.Code != "ot" && item.Code != "xk" && < FlagIcon code={item.Code} />} {item.country}</Link></td>
              <td>{item.confirm}</td>
              <td>{item.recovered}</td>
              <td>{item.deaths}</td>
          </tr>
        )
      })
    }
  renderTable=()=>{
 
    return(
      <table className="table">
        <thead className="table-dark" >
          <tr >
            <th>Country</th>
            <th>Confirmed</th>
            <th>Recovery</th>
            <th>Death</th>
          </tr>
        </thead>
        <tbody>
          {this.renderCountries()}
        </tbody>
      </table>
    );
  }
  

render(){
  return(
    <div>
      <Navbar/>

      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            {this.renderTable()}
          </div>
        </div>


      </div>
    </div>
  )
}

}

export default Home;