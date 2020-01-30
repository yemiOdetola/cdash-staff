import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import globals from '../globals';
import { fetchAssetsContainers, fetchAssetsAll } from '../actions/assets';

export class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    if (localStorage.getItem('userToken') && localStorage.getItem('userId')) {
      this.props.fetchAssetsContainers();
      let assets = ['Hardware', 'Software', 'Connectivity', 'Others', 'Business_continuity'];
      assets.forEach(asset => {
        this.props.fetchAssetsAll(asset, 0, 99);
      });
    } else {
      this.props.history.push('/login');
    }
  }
  render() {
    let assetsContainers = [];
    if (this.props.assetsContainers[0]) {
      this.props.assetsContainers[0].forEach((container, i) => {
        assetsContainers.push(
          <div className="each-asset" key={i}>
            <h3 className="title">{container.name}</h3>
            <div className="sub">{globals.formatDate(container.date)}</div>
            <Link to={`/asset-details/${container._id}`}>View details</Link>
          </div>
        )
      })
    }
    return (
      <>
        <div className={'data-loading'}>
          <img src={require("../assets/images/spinner.svg")} className={this.state.loading && !this.props.assetsContainers.length ? 'loader-img' : 'hide'} alt="+" />
        </div>
        <Header />
        <div className="row">
          <div className="container-fluid p-0">
            <div className="col-lg-12 p-0">
              <section className="component-section">
                <div className="col-md-12">
                  <div className="assets change">
                    <div className={this.props.hardware ? "each-asset" : 'hide'}>
                      <h3 className="title"><Link to={`/asset-details/Hardware`}>Hardware</Link></h3>
                    </div>
                    <div className={this.props.software ? "each-asset" : 'hide'}>
                      <h3 className="title"><Link to={`/asset-details/Software`}>Software</Link></h3>
                    </div>
                    {/* <div className="underline-sm"></div> */}
                    <div className={this.props.connectivity ? "each-asset" : 'hide'}>
                      <h3 className="title"><Link to={`/asset-details/Connectivity`}>Connectivity</Link></h3>
                    </div>
                    {/* <div className="underline-bg"></div> */}
                    <div className={this.props.business_continuity ? "each-asset" : 'hide'}>
                      <h3 className="title"><Link to={`/asset-details/Business_continuity`}>Business continuity</Link></h3>
                    </div>
                    <div className={this.props.others ? "each-asset" : 'hide'}>
                      <h3 className="title"><Link to={`/asset-details/Others`}>Others</Link></h3>
                    </div>
                    {/* <div className="underline-sm"></div> */}
                    <div className="each-asset">
                      <h3 className="title"><Link to={`/staffs`}>Human assets</Link></h3>
                    </div>
                    <div className="each-asset">
                      <h3 className="title"><Link to={`/socials`}>Social media</Link></h3>
                    </div>
                    {/* <div className="underline-sm"></div> */}
                    {/* <div className="underline-bg"></div> */}
                    {/* <div className="each-asset">
                      <h3 className="title"><Link to={`/socials`}>Social media</Link></h3>
                    </div> */}
                    {/* <div className="underline-sm"></div> */}
                  </div>
                </div>
              </section>
              <section className="text-center">
                <div className="container">
                  <div className="row mx-auto">
                    <div className="col-md-2 col-lg-2">
                      <div className="text-block menu">
                        <Link to="/expenses-turnover">
                          <img src={require('../assets/images/turnover.svg')} className="menu-img" alt="staffs" />
                          <h4>Expenses/Turnover</h4>
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-2 col-lg-2">
                      <div className="text-block menu">
                        <Link to="/recurring-expenditure">
                          <img src={require('../assets/images/recurring.svg')} className="menu-img" alt="staffs" />
                          <h4>Recurring expenditure</h4>
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-2 col-lg-2">
                      <div className="text-block menu">
                        <Link to="/capital-expenditure">
                          <img src={require('../assets/images/capital.svg')} className="menu-img" alt="staffs" />
                          <h4>Capital expenditure</h4>
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-2 col-lg-2">
                      <div className="text-block menu">
                        <Link to="/logs">
                          <img src={require('../assets/images/logs.svg')} className="menu-img" alt="staffs" />
                          <h4>Logs</h4>
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-2 col-lg-2">
                      <div className="text-block menu">
                        <Link to="/maturity-scores">
                          <img src={require('../assets/images/scores.svg')} className="menu-img" alt="staffs" />
                          <h4>Maturity scores</h4>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  assetsContainers: state.assets.assetsContainers,
  others: state.assets.others,
  hardware: state.assets.hardware,
  software: state.assets.software,
  connectivity: state.assets.connectivity,
  business_continuity: state.assets.business_continuity
})


export default connect(mapStateToProps, { fetchAssetsContainers, fetchAssetsAll })(Landing)
