import React, { Component } from 'react';
import { connect } from 'react-redux';
import globals from '../globals';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Header from './layouts/Header';
import Footer from './layouts/Footer';


export class Logs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: { datasets: [], labels: [] },
    }
  }
  years = [];
  assetsChart = [];
  staffsChart = [];
  socialsChart = [];
  orgChart = [];
  chartOptions = {
    title: {
      display: true,
      text: '',
      fontSize: 20
    },
    legend: {
      display: true,
      position: 'right'
    }
  };

  componentDidMount() {
    if (localStorage.getItem('userToken') && localStorage.getItem('userId')) {
      this.fetchLogs();
    } else {
      this.props.history.push('/login');
    }
  }

  fetchLogs = () => {
    const userToken = localStorage.getItem('userToken');
    axios.get(`${globals.base_url}/logs/day`, {
      headers: {
        'Authorization': 'Bearer ' + userToken
      }
    })
      .then(response => {
        if (response.data.status === false) {
          return console.log(response, 'fetch asset not successful');
        }
        let res = response.data.data;
        res.forEach(log => {
          if (log.module === 'asset [Finance]' || 'asset' || 'asset container') {
            this.assetsChart.push(log)
          }
          if (log.module === 'organization') {
            this.orgChart.push(log);
          }
          if (log.module === 'staff') {
            this.staffsChart.push(log);
          }
          if (log.module === 'social') {
            this.socialsChart.push(log);
          }
        })
        let data = {
          labels: ['Staffs', 'Organization', 'Assets', 'Social'],
          datasets: [{
            label: "Logs",
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75, 192, 192, 1)',
            borderColor: 'rgba(0, 0, 0, 0.75)',
            borderWidth: 2,
            data: [this.staffsChart.length, this.orgChart.length, this.assetsChart.length, this.socialsChart.length]
          }]
        }
        this.setState({
          data: data,
          loading: false
        })
      })
      .catch(error => {
        console.log('catch error register', error);
        throw (error);
      })
  }

  back = () => {
    this.props.history.go(-1);
  }

  render() {
    return (
      <>
        <div className={'data-loading'}>
          <img src={require("../assets/images/spinner.svg")} className={this.state.loading ? 'loader-img' : 'hide'} alt="+" />
        </div>
        <Header />
        <div className="go-back mt-5" onClick={this.back}>
          <img src={require("../assets/images/back.svg")} alt="<<<" />
          <span>Back</span>
        </div>
        <div className="expenditures">
          <div className="row">
            <div className="col-xl-9 mx-auto mx-auto">
          <h1 className="text-center component-header mb-2">Today's log</h1>
              <Line
                data={this.state.data}
                options={this.chartOptions} />
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}


export default connect(null, {})(Logs)
