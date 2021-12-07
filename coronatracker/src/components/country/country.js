import React, { Component } from 'react'

//material ui icons
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import FlagIcon from '../../flagIcon';

// AppexCharts Library
import Chart from "react-apexcharts";

// Card Components (child)
import Card from "../card/card"
import Navbar from '../shared/navbar/navbar';

// Axios 
import axios from 'axios';

class Country extends Component {
    constructor(props) {
        super(props);

        // for fourteendays selection 0=bar chart, 1= aria chart and 2=line chart
        this.state = {
            fourteenDaysSelection: 0,
            // we added default country so not be null and lead to errors
            country: { countryCode: "lb", country: "Lebanon", totalDeaths: 0, totalConfirmed: 0, totalRecovered: 0, totalCritical: 0, activeCases: 0 },
            fourteenDays: []

        }
    }
    componentDidMount() {
        this.fetchCountry()
        this.fetchFourteenDays()
    }

    fetchCountry = async () => {
        let { match } = this.props;
        let countryCode = match.params.id;


        let url = "https://api.coronatracker.com/v3/stats/worldometer/country?countryCode=" + countryCode

        axios({
            method: 'get',
            url: url,
        })
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                    let country = response.data[0]
                    this.setState({
                        country
                    })
                }
                else {
                    alert("Something happen please refresh")
                }

            });
    }
    fetchFourteenDays = async () => {
        let { match } = this.props;
        let countryCode = match.params.id;
        var fortnightBefore = new Date(Date.now() - 12096e5)
        let startDate = fortnightBefore.getFullYear() + "-" + ((fortnightBefore.getMonth() + 1) > 10 ? ((fortnightBefore.getMonth() + 1)) : ("0" + (fortnightBefore.getMonth() + 1))) + "-" + ((fortnightBefore.getDate() + 1) > 10 ? ((fortnightBefore.getDate() + 1)) : ("0" + (fortnightBefore.getDate() + 1)))
        let d = new Date();
        let endDateObj = d.setDate(d.getDate() - 1);
        endDateObj = new Date()
        let endDate = endDateObj.getFullYear() + "-" + ((endDateObj.getMonth() + 1) > 10 ? ((endDateObj.getMonth() + 1)) : ("0" + (endDateObj.getMonth() + 1))) + "-" + ((endDateObj.getDate() + 1) > 10 ? ((endDateObj.getDate() + 1)) : ("0" + (endDateObj.getDate() + 1)))

        let url = "https://api.coronatracker.com/v5/analytics/trend/country?countryCode=" + countryCode + "&startDate=" + startDate + "&endDate=" + endDate

        axios({
            method: 'get',
            url: url,
        })
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                    this.setState({
                        fourteenDays: response.data
                    })
                }
                else {
                    alert("Something happen please refresh")
                }

            });
    }
    renderOverView = () => {
        let { country } = this.state;
        return (
            <div className="row">
                <div className="col-auto mr-auto">
                    <h6><strong> <FlagIcon code={country.countryCode.toLowerCase()} /> {country.country}</strong></h6>
                </div>
                <div className="col-auto">
                    <h6>Share: <FacebookIcon className="fb" /> <TwitterIcon className="twitter" /> </h6>
                </div>
            </div>
        )
    }
    renderStats = () => {
        let { country } = this.state;
        return (
            <div className="row text-center">
                <div className="col-4">
                    <h4 className="txtRed">{country.totalConfirmed}</h4>
                    <p className="txtGray bolded">Confirmed</p>
                    <p className="subtitle txtRed upMargin15">+{country.dailyConfirmed} new cases</p>
                </div>
                <div className="col-4">
                    <h4 className="txtGreen">{country.totalRecovered}</h4>
                    <p className="txtGray bolded">Recovered</p>
                </div>
                <div className="col-4">
                    <h4 className="txtGray">{country.totalDeaths}</h4>
                    <p className="txtGray bolded">Dead</p>
                    <p className="subtitle txtRed upMargin15">+{country.dailyDeaths} new deaths</p>
                </div>
            </div>
        )
    }

    renderFatalityCard = () => {
        let { country } = this.state;

        let series = [country.totalDeaths, country.totalConfirmed];
        let deadPercent = country.totalDeaths / series[1] * 100;
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
        let { country } = this.state;

        let series = [country.totalConfirmed - country.totalRecovered, country.totalConfirmed];
        let recoverPercent = country.totalRecovered / series[1] * 100;
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
                    <Card>
                        {this.renderOverView()}
                        {this.renderStats()}
                    </Card>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-10 paddingHorizontal5">
                    <Card card={{ height: "100%" }} cardBody={{ padding: 0 }}>
                        {this.renderFatalityCard()}
                    </Card>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-10 paddingHorizontal5">
                    <Card card={{ height: "100%" }} cardBody={{ padding: 0 }}>
                        {this.renderRecoveryCard()}
                    </Card>
                </div>
            </div>
        )
    }
    renderSecondThreeCardsBG = (id, title, stat, description) => {
        // chart data
        // return chat component, and also accept 3 parameters
        // do positioning on the data and the chart.

        let options = {
            chart: {
                id: id,
                toolbar: {
                    show: false,

                },
                zoom: {
                    enabled: false
                },
                width: "100%",
                height: "100%"

            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                labels: {
                    show: false,
                    minHeight: 0,
                    maxHeight: 0,
                },
                axisTicks: {
                    show: false,
                }
            },
            yaxis: {
                show: false,
            },
            grid: {
                show: false,
            },
            markers: {
                size: 0,
            },
            stroke: {
                show: true,
                curves: 'smooth',
                colors: ["rgb(68,167,196)"]
            },
            tooltip: {
                enabled: false,
            },
            fill: {
                colors: ["rgb(0,143,251)"],
                opacity: 0.9,
            }

        }

        let series = [
            {
                data: [0, 30, 40, 70, 30, 100, 50, 120, 130, 160]
            }
        ]
        return (
            <div>
                <p style={{ position: "absolute", top: 15, left: 15 }}> <strong>{title}</strong> </p>
                <p style={{ position: "absolute", top: 55, left: 15, fontSize: 25 }}> <strong>{stat}</strong> </p>
                {description}
                <Chart
                    options={options}
                    series={series}
                    type="area"
                    width="100%"
                    height="100%"
                    style={{
                        position: "relative",
                        right: -10,
                        bottom: -5
                    }}
                />
            </div >
        )
    }

    renderSecondThreeCards = () => {
        let { country } = this.state;
        let icuPercentage = country.totalCritical / country.totalConfirmed * 100;
        let activeCasesPercentage = country.activeCases / country.totalConfirmed * 100;
        return (
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-10 paddingHorizontal5">
                    <Card cardBody={{ padding: 0 }}>
                        {this.renderSecondThreeCardsBG("cardOneInSecondSection", "Critical Cases Treated in ICU", country.totalCritical, <p style={{ position: "absolute", bottom: 15, left: 15, zIndex: 999, color: "#4a5568" }}><span style={{ color: "red" }}>{icuPercentage.toFixed(1)}%</span>of total cases</p>)}
                    </Card>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-10 paddingHorizontal5">
                    <Card cardBody={{ padding: 0 }}>
                        {this.renderSecondThreeCardsBG("cardTwoInSecondSection", "Daily Cases Receiving Treatments", country.activeCases, <p style={{ position: "absolute", bottom: 15, left: 15, zIndex: 999, color: "#4a5568" }}><span style={{ color: "red" }}>{activeCasesPercentage.toFixed(1)}%</span>of total cases</p>)}
                    </Card>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-10 paddingHorizontal5">
                    <Card cardBody={{ padding: 0 }}>
                        {this.renderSecondThreeCardsBG("cardThreeInSecondSection", "Daily Confirm Cases", country.totalConfirmedPerMillionPopulation, <p style={{ position: "absolute", bottom: 15, left: 15, zIndex: 999, color: "#4a5568" }}>Per Million Population</p>)}
                    </Card>
                </div>
            </div >
        )
    }


    renderFourtenDaysChart = (type) => {
        let { fourteenDays } = this.state;
        let confirmArray = [];
        let recoveredArray = [];
        let deathArray = []
        let dateArray = []

        fourteenDays.map((item, index) => {
            confirmArray.push(item.total_confirmed)
            recoveredArray.push(item.total_recovered)
            deathArray.push(item.total_deaths)
            let date = new Date(item.last_updated)
            let formateDate = (date.getUTCMonth() + 1) + "/" + date.getUTCDate()
            dateArray.push(formateDate)
        })

        let series = [
            {
                name: 'Confirmed',
                data: confirmArray
            }, {
                name: 'Recoverd',
                data: recoveredArray
            },
            {
                name: 'Death',
                data: deathArray
            },
        ]

        let options = {
            chart: {
                stacked: type === "bar" ? true : false,
                toolbar: {
                    show: false
                },
            },
            dataLabels: {
                enabled: false
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                },
            },
            xaxis: {
                type: 'category',
                categories: dateArray
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
            colors: ['rgba(0,143,251,0.85)', 'rgba(0,227,150,0.85)', 'rgba(254,176,25,0.85)'],
            grid: {
                show: false
            },
            stroke: {
                curve: "smooth"
            }

        };

        return (
            <Chart series={series} options={options} width="100%" height="340" type={type} />
        )

    }

    renderThirdLargeCard = () => {
        let { fourteenDaysSelection } = this.state;

        return (
            <div className="row">
                <div className="col mb-10 paddingHorizontal5">

                    <Card >
                        <h5> <strong>Past 14 Days Chart</strong> </h5>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle fourteenDaysDropdown" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <strong>{fourteenDaysSelection === 0 && "Bar Chart"}</strong>
                                <strong>{fourteenDaysSelection === 1 && "Area Chart"}</strong>
                                <strong>{fourteenDaysSelection === 2 && "Line Chart"}</strong>

                            </button>
                            <div className="dropdown-menu fourteenDaysMenuItem" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item fourteenDaysMenuItem" onClick={() => this.setState({ fourteenDaysSelection: 0 })} >Bar</a>
                                <a className="dropdown-item fourteenDaysMenuItem" onClick={() => this.setState({ fourteenDaysSelection: 1 })}>Area</a>
                                <a className="dropdown-item fourteenDaysMenuItem" onClick={() => this.setState({ fourteenDaysSelection: 2 })} >Line</a>
                            </div>
                        </div>
                        {fourteenDaysSelection === 0 && this.renderFourtenDaysChart("bar")}
                        {fourteenDaysSelection === 1 && this.renderFourtenDaysChart("area")}
                        {fourteenDaysSelection === 2 && this.renderFourtenDaysChart("line")}
                    </Card>
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
                <Navbar />
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
export default Country