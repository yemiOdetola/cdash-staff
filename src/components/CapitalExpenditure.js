import React, { Component } from 'react';
import { connect } from 'react-redux';
import globals from '../globals';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { fetchAssetsContainers } from '../actions/assets';


export class CapitalExpenditure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      assetId: '',
      start_year: '',
      end_year: '',
      showSelected: false,
      capital_dollar: 0,
      capital_naira: 0,
      total_capital_dollar: 0,
      total_capital_naira: 0,
      data: { datasets: [], labels: [] },
    }
  }
  years = [];
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
      const fullDate = new Date();
      let year = fullDate.getFullYear();
      for (let i = 0; i < 10; i++) {
        this.years.push(year--);
      }
      this.props.fetchAssetsContainers();
      const payload = {
        id: this.state.assetId,
        start_year: this.state.start_year,
        end_year: this.state.end_year
      }
      this.initCapitalData(payload);
    } else {
      this.props.history.push('/login');
    }
  }

  handleChange = (key, value) => {
    this.setState({
      [key]: value
    })
  };

  submitForm = (e) => {
    e.preventDefault();
    globals.createToast('Please wait', 1000, 'bottom-right');
    const payload = {
      id: this.state.assetId,
      start_year: this.state.start_year,
      end_year: this.state.end_year
    }
    this.generateCapitalData(payload);
  }

  initCapitalData = (payload) => {
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
            data: [res.total_amount_dollar, res.total_amount_naira]
          }]
        }
        this.setState({
          data: data,
          total_capital_dollar: res.total_amount_dollar,
          total_capital_naira: res.total_amount_naira
        })
      })
      .catch(error => {
        console.log('catch error register', error);
        throw (error);
      })
  }

  generateCapitalData = (payload) => {
    this.setState({
      showSelected: true,
      loading: true
    })
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
          labels: ['total amount($)', 'total amount(₦)', 'Selected asset(₦)', 'Selected asset($)'],
          datasets: [{
            label: "Capital expenditure",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [res['total_amount_dollar'], res['total_amount_naira'], res['amount_naira'], res['amount_dollar']]
          }]
        }
        this.setState({
          loading: false,
          data: data,
          total_capital_dollar: res.total_amount_dollar,
          total_capital_naira: res.total_amount_naira,
          capital_dollar: res.amount_dollar,
          capital_naira: res.amount_naira
        })

      })
      .catch(error => {
        this.setState({
          loading: false
        })
        console.log('catch error register', error);
        throw (error);
      })
  }

  back = () => {
    this.props.history.go(-1);
  }

  render() {
    let table = [];
    let options = [];
    let yearOptions = [];
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
    if (this.props.assetsContainers[0]) {
      this.props.assetsContainers[0].forEach((container, i) => {
        options.push(
          <option value={container._id} key={i}>{container.name}</option>
        )
      })
    }
    if (this.years) {
      this.years.forEach((year, i) => {
        yearOptions.push(
          <option value={year} key={i}>{year}</option>
        )
      })
    }
    return (
      <>
        <div className={'data-loading'}>
          <img src={require("../assets/images/spinner.svg")} className={this.state.loading && !this.props.assetsContainers.length ? 'loader-img' : 'hide'} alt="+" />
        </div>
        <Header />
        <div className="go-back mt-5" onClick={this.back}>
          <img src={require("../assets/images/back.svg")} alt="<<<" />
          <span>Back</span>
        </div>
        <div className="expenditures">
          <div className="row">
            <div className="col-xl-9 mx-auto mx-auto">
              <form onSubmit={this.onSubmit} className="chart-form">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-item">
                      <label htmlFor="assetId">Assets</label>
                      <select onChange={e => this.handleChange("assetId", e.target.value)}>
                        <option value="">All assets</option>
                        {options}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="form-item">
                      <label htmlFor="start_year">Start year</label>
                      <select onChange={e => this.handleChange("start_year", e.target.value)}>
                        <option value="">All years</option>
                        {yearOptions}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="form-item">
                      <label htmlFor="end_year">End year</label>
                      <select onChange={e => this.handleChange("end_year", e.target.value)}>
                        <option value="">All years</option>
                        {yearOptions}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <button className="submit-btn" onClick={this.submitForm}>Submit</button>
                  </div>
                </div>
              </form>
              <Bar
                data={this.state.data}
                options={this.chartOptions} />
              <div className="mt-4">
                <p className="chart-data">Total recurring expenditure($):  {this.state.total_capital_dollar}</p>
                <p className="chart-data">Total recurring expenditure(₦): {this.state.total_capital_naira}</p>
                <p className={this.state.showSelected ? 'chart-data' : 'hide'}>Selected asset's recurring expenditure ($):  {this.state.capital_dollar}</p>
                <p className={this.state.showSelected ? 'chart-data' : 'hide'}>Selected asset's recurring expenditure(₦): {this.state.capital_naira}</p>
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
  assets: state.assets.assets,
  assetsContainers: state.assets.assetsContainers
})


export default connect(mapStateToProps, { fetchAssetsContainers })(CapitalExpenditure)
