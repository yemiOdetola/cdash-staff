import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
// import globals from '../globals';
import { fetchAllAssetsContainers } from '../actions/assets';

export class AllContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    if (localStorage.getItem('userToken') && localStorage.getItem('userId')) {
      this.props.fetchAllAssetsContainers();
    } else {
      this.props.history.push('/login');
    }
  }

  back = () => {
    this.props.history.go(-1);
  }

  render() {
    let assetsContainers = [];
    if (this.props.allAssetsContainers[0]) {
      this.props.allAssetsContainers[0].forEach((container, i) => {
        assetsContainers.push(
          <div className="ass">
            <div className="icon">
              {container.icon && container.icon.includes('://')
                ? <img src={container.icon} alt="*" />
                : <i className={container.icon ? `las la-3x + ${container.icon}` : 'lab la-renren'}></i>
              }
            </div>
            <div className="name">
              <Link className="right" to={`/asset-details/${container._id}`}>{container.name}</Link>
            </div>
          </div>
          // <div className="each-asset">
          //   <h3 className="title"><Link to={`/asset-details/${container._id}`}>{container.name}</Link></h3>
          // </div>
        )
      })
    }
    return (
      <>
        <div className={'data-loading'}>
          <img src={require("../assets/images/spinner.svg")} className={this.state.loading && !this.props.allAssetsContainers.length ? 'loader-img' : 'hide'} alt="+" />
        </div>
        <Header />
        <div className="go-back mt-5" onClick={this.back}>
          <img src={require("../assets/images/back.svg")} alt="<<<" />
          <span>Back</span>
        </div>
        <div className="row">
          <div className="container-fluid p-0">
            <div className="col-lg-12 p-0">
              <section className="component-section">
                <div className="col-md-12">
                  <div className="assets change">
                    {assetsContainers}
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
  allAssetsContainers: state.assets.allAssetsContainers
})


export default connect(mapStateToProps, { fetchAllAssetsContainers })(AllContainer)
