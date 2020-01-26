import React, { Component } from 'react';
import { connect } from 'react-redux';
import globals from '../globals';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { fetchAssets } from '../actions/assets';


export class AssetDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      recurring_dollar: 0,
      recurring_naira: 0,
      capital_dollar: 0,
      capital_naira: 0,
      data: { datasets: [], labels: [] },
      capData: { datasets: [], labels: [] }
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
    const assetId = this.props.match.params['id'];
    if (localStorage.getItem('userToken') && localStorage.getItem('userId')) {
      this.props.fetchAssets(assetId);
      const capPayload = {
        id: assetId,
        start_year: '',
        end_year: ''
      }
      const payload = {
        id: assetId,
        year: ''
      }
      this.fetchRecurringData(payload);
      this.fetchCapitalData(capPayload)
    } else {
      this.props.history.push('/login');
    }
  }

  fetchCapitalData = (payload) => {
    const userToken = localStorage.getItem('userToken');
    axios.post(`${globals.base_url}/asset_data/count/capital`, payload, {
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
          labels: ["total amount($)", "total amount(₦)"],
          datasets: [{
            label: "Capital expenditure",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [res.amount_dollar, res.amount_naira]
          }]
        }
        this.setState({
          capData: data,
          capital_dollar: res.amount_dollar,
          capital_naira: res.amount_naira
        })
      })
      .catch(error => {
        console.log('catch error register', error);
        throw (error);
      })
  }

  fetchRecurringData = (payload) => {
    const userToken = localStorage.getItem('userToken');
    axios.post(`${globals.base_url}/asset_data/count/recurring`, payload, {
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
          labels: ["total amount($)", "total amount(₦)"],
          datasets: [{
            label: "Recurring expenditure",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [res.amount_dollar, res.amount_naira]
          }]
        }
        this.setState({
          data: data,
          recurring_dollar: res.amount_dollar,
          recurring_naira: res.amount_naira
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
    let table = [];
    if (this.props.assets[0]) {
      this.props.assets[0].forEach((asset, i) => {
        table.push(
          <tr key={i}>
            <td>{asset.name}</td>
            <td>{globals.trimSubtitle(asset.summary) || 'n/A'}</td>
            <td>{globals.formatDate(asset.date_acquired) || 'n/A'}</td>
            <td>{asset.cost.naira || 'n/A'}</td>
            <td>{asset.cost.dollar || 'n/A'}</td>
            <td>
              <Link to={`/asset-data/${asset._id}`}>View</Link>
            </td>
          </tr>
        )
      })
    }
    return (
      <>
        <div className={'data-loading'}>
          <img src={require("../assets/images/spinner.svg")} className={this.state.loading && !this.props.assets.length ? 'loader-img' : 'hide'} alt="+" />
        </div>
        <Header />
        <div className="go-back mt-5" onClick={this.back}>
          <img src={require("../assets/images/back.svg")} alt="<<<" />
          <span>Back</span>
        </div>
        <section className="table-toppings">
          <h1 className="text-center component-header mb-5">All assets</h1>
          <div className="tbl-header">
            <table>
              <thead>
                <tr>
                  <th>Asset Name</th>
                  <th>Summary</th>
                  <th>Date acquired</th>
                  <th>Acquisition cost (naira)</th>
                  <th>Acquisition cost (dollar)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {table}
              </tbody>
            </table>
          </div>
        </section>
        <div className="expenditures">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-10 mx-auto">
              <Bar
                // height={250}
                data={this.state.data}
                options={this.chartOptions} />
              <div className="mt-4">
                <p>Recurring expenditure($):  {this.state.recurring_dollar || 0}</p>
                <p>Recurring expenditure(₦): {this.state.recurring_naira || 0}</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-10 mx-auto capital">
              <Bar
                height={250}
                data={this.state.capData}
                options={this.chartOptions} />
              <div className="mt-4">
                <p>Capital expenditure($):  {this.state.capital_dollar || 0}</p>
                <p>Capital expenditure(₦): {this.state.capital_naira || 0}</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  assets: state.assets.assets
})


export default connect(mapStateToProps, { fetchAssets })(AssetDetails)
