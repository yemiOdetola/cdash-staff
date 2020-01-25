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
    this.props.fetchAssetsContainers();
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
                  <div className="row">
                    <div className="col-md-6 col-lg-3">
                      <div className="text-block">
                        <i className="icon icon--lg icon-Mail-3"></i>
                        <h4>Regular Updates</h4>
                        <p> direct to your inbox</p>
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
