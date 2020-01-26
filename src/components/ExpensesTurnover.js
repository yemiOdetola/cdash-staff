import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import globals from '../globals';

export class ExpensesTurnover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: { datasets: [], labels: [] },
    }
  }

  chartOptions = {
    scales: {
      xAxes: [{
        barThickness: 20,
        maxBarThickness: 26,
        gridLines: {
          display: true,
          color: '#ffffff'
        }
      }],
      yAxes: [{
        gridLines: {
          display: true,
          ticks: true
        }
      }],
    },
  };


  componentDidMount() {
    if (localStorage.getItem('userToken') && localStorage.getItem('userId')) {
      this.fetchExpensesTurnover();
    } else {
      this.props.history.push('/login');
    }
  }

  back = () => {
    this.props.history.go(-1);
  }

  fetchExpensesTurnover = () => {
    const userToken = localStorage.getItem('userToken');
    axios.post(`${globals.base_url}/asset_data/count/turnover`, {}, {
      headers: {
        'Authorization': 'Bearer ' + userToken
      }
    })
      .then(response => {
        if (response.data.status === false) {
          const msg = response.data.msg || 'Please reload page.';
          globals.createToast(msg, 3000, 'bottom-right');
          return console.log(response, 'fetch asset not successful');
        }
        let res = response.data;
        let data = {
          labels: ['2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012'],
          datasets: [{
            label: "Expenses",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [
              res.expenses[0].amount,
              res.expenses[1].amount,
              res.expenses[2].amount,
              res.expenses[3].amount,
              res.expenses[4].amount,
              res.expenses[5].amount,
              res.expenses[6].amount,
              res.expenses[7].amount,
              res.expenses[8].amount,
            ]
          }, {
            label: "Turnover",
            backgroundColor: 'rgb(24, 231, 152)',
            borderColor: 'rgb(24, 231, 152)',
            data: [
              res.turnovers[0].amount,
              res.turnovers[1].amount,
              res.turnovers[2].amount,
              res.turnovers[3].amount,
              res.turnovers[4].amount,
              res.turnovers[5].amount,
              res.turnovers[6].amount,
              res.turnovers[7].amount,
              res.turnovers[8].amount,
            ]
          }]
        }
        this.setState({
          data: data,
        })
      })
      .catch(error => {
        console.log('catch error register', error);
        throw (error);
      })
  }


  render() {
    return (
      <>
        <div className={'data-loading'}>
          <img src={require("../assets/images/spinner.svg")} className={this.state.loading && !this.state.data.datasets ? 'loader-img' : 'hide'} alt="+" />
        </div>
        <Header />
        <div className="go-back mt-5" onClick={this.back}>
          <img src={require("../assets/images/back.svg")} alt="<<<" />
          <span>Back</span>
        </div>
        <section>
          <h1 className="text-center component-header mb-4">Expenses/Turnover chart</h1>
          <div className="container">
            <div className="row">
              <div className="col-xl-9 mx-auto">
                <Bar
                  height={150}
                  data={this.state.data}
                  options={this.chartOptions} />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    )
  }
}



export default connect(null, {})(ExpensesTurnover)
