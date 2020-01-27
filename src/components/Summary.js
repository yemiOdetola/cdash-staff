import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { assetsCount, usersCount, staffsCount, avgCount } from '../actions/summary';

export class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    if (localStorage.getItem('userToken') && localStorage.getItem('userId')) {
      this.props.assetsCount();
      this.props.usersCount();
      this.props.staffsCount();
      this.props.avgCount();
    } else {
      this.props.history.push('/login');
    }
  }

  back = () => {
    this.props.history.go(-1);
  }

  
  render() {
    return (
      <>
        <div className={'data-loading'}>
          <img src={require("../assets/images/spinner.svg")} className={this.state.loading && !this.props.avgScore ? 'loader-img' : 'hide'} alt="+" />
        </div>
        <Header />
        <div className="go-back mt-5" onClick={this.back}>
          <img src={require("../assets/images/back.svg")} alt="<<<" />
          <span>Back</span>
        </div>
        <div className="container-fluid p-0">
          <div className="row">
            <section>
              <h1 className="component-header">Summary</h1>
              <div className="assets">
                <div className="row">
                  <div className="col-lg-4 col-xl-3">
                    <div className="each-stat one">
                      <div className="stats-overview"> Total number of staffs on the platform</div>
                      <div className="stats-data">
                        <div className="data">
                          {this.props.staffs}
                        </div>
                        <div className="icon">
                          <img
                            src={require("../assets/images/stat.svg")}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-xl-3">
                    <div className="each-stat two">
                      <div className="stats-overview"> Total number of users on the platform</div>
                      <div className="stats-data">
                        <div className="data">
                          {this.props.users}
                        </div>
                        <div className="icon">
                          <img
                            src={require("../assets/images/stat.svg")}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-xl-3">
                    <div className="each-stat three">
                      <div className="stats-overview"> Total number of assets on the platform</div>
                      <div className="stats-data">
                        <div className="data">
                          {this.props.assets}
                        </div>
                        <div className="icon">
                          <img
                            src={require("../assets/images/stat.svg")}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-xl-3">
                    <div className="each-stat four">
                      <div className="stats-overview"> Average maturity score</div>
                      <div className="stats-data">
                        <div className="data">
                          {this.props.avgScore}
                        </div>
                        <div className="icon">
                          <img
                            src={require("../assets/images/stat.svg")}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.summary.users,
  staffs: state.summary.staffs,
  assets: state.summary.assets,
  avgScore: state.summary.avgScore,
})


export default connect(mapStateToProps, { assetsCount, usersCount, staffsCount, avgCount })(Summary)
