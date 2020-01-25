import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import globals from '../globals';
import { fetchAssetsContainers } from '../actions/assets';

export class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    if(localStorage.getItem('userToken') && localStorage.getItem('userId')) {
      this.props.fetchAssetsContainers();
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
                  <h1 className="component-header">Assets</h1>
                  <div className="assets">
                    {assetsContainers}
                  </div>
                </div>
              </section>
              <section className="text-center">
                <div className="container">
                  <div className="row mx-auto">
                    <div className="col-md-4 col-lg-2">
                      <div className="text-block menu">
                        <Link to="/staffs">
                          <img src={require('../assets/images/staffs.svg')} className="menu-img" alt="staffs" />
                          <h4>Staffs</h4>
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-4 col-lg-2">
                      <div className="text-block menu">
                        <Link to="/socials">
                          <img src={require('../assets/images/socials.svg')} className="menu-img" alt="staffs" />
                          <h4>Social media</h4>
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-4 col-lg-2">
                      <div className="text-block menu">
                        <Link to="/users">
                          <img src={require('../assets/images/users.svg')} className="menu-img" alt="staffs" />
                          <h4>Users</h4>
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
  assetsContainers: state.assets.assetsContainers
})


export default connect(mapStateToProps, { fetchAssetsContainers })(Landing)
