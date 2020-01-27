import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import globals from '../globals';
import { fetchScores, fetchAverage } from '../actions/summary';

export class Maturity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    if (localStorage.getItem('userToken') && localStorage.getItem('userId')) {
      this.props.fetchScores();
      this.props.fetchAverage();
    } else {
      this.props.history.push('/login');
    }
  }

  back = () => {
    this.props.history.go(-1);
  }

  render() {
    let table = [];
    if (this.props.maturity[0]) {
      this.props.maturity[0].forEach((score, i) => {
        table.push(
          <tr key={i}>
            <td>{globals.trimTr(score.parameter)}</td>
            <td>{score.score}</td>
          </tr>
        )
      })
    }
    return (
      <>
        <div className={'data-loading'}>
          <img src={require("../assets/images/spinner.svg")} className={this.state.loading && !this.props.maturity.length ? 'loader-img' : 'hide'} alt="+" />
        </div>
        <Header />
        <div className="go-back mt-5" onClick={this.back}>
          <img src={require("../assets/images/back.svg")} alt="<<<" />
          <span>Back</span>
        </div>
        <section className="table-toppings">
          <h1 className="text-center component-header mb-5">ICT maturity scores</h1>
          <div className="tbl-header">
            <table>
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {table}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <p className="chart-data">Average maturity score:  {this.props.average}</p>
          </div>
        </section>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  maturity: state.summary.maturity,
  average: state.summary.average,
})

export default connect(mapStateToProps, { fetchScores, fetchAverage })(Maturity)
