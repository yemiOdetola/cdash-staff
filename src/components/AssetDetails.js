import React, { Component } from 'react';
import { connect } from 'react-redux';
import globals from '../globals';
import { Link } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { fetchAssets, countAssets } from '../actions/assets';


export class AssetDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      pageIndex: 0,
      limit: 10,
      disablePrev: true,
      disableNext: false
    }
  }
  disablePrev = true;
  disableNext = false;
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
      let skip = this.state.pageIndex * this.state.limit;
      this.props.fetchAssets(assetId, skip, this.state.limit);
      this.props.countAssets();
    } else {
      this.props.history.push('/login');
    }
  }

  itemNav() {
    if (((this.state.pageIndex * 10) + 10) >= this.props.countAssets) {
      this.disableNext = true;
    } else {
      this.disableNext = false;
    }
    if (this.pageIndex === 0) {
      this.disablePrev = true;
    } else {
      this.disablePrev = false;
    }
  }

  getNext = () => {
    this.setState({
      pageIndex: this.state.pageIndex + 1
    })
    let skip = this.state.pageIndex * this.state.limit;
    this.props.fetchAssetsAll(this.state.assetType, skip, this.limit);
    this.itemNav();
  }

  getPrev = () => {
    this.setState({
      pageIndex: this.state.pageIndex - 1
    })
    let skip = this.state.pageIndex * this.state.limit;
    this.props.fetchAssetsAll(this.state.assetType, skip, this.limit);
    this.itemNav();
  }

  back = () => {
    this.props.history.go(-1);
  }

  render() {
    let table = [];
    if (this.props.countAssets <= 10) {
      this.disableNext = true;
    } else {
      this.disableNext = false;
    }
    if (this.props.assets[0]) {
      this.props.assets[0].forEach((asset, i) => {
        table.push(
          <tr key={i}>
            <td>{asset.name}</td>
            {/* <td>{globals.trimSubtitle(asset.summary) || 'n/A'}</td> */}
            <td>{globals.formatDate(asset.date_acquired) || 'n/A'}</td>
            {/* <td>{asset.cost.naira || 'n/A'}</td>
            <td>{asset.cost.dollar || 'n/A'}</td> */}
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
          {/* <h1 className="text-center component-header mb-5">{this.state.type || ''} assets</h1> */}
          <div className="tbl-header">
            <table>
              <thead>
                <tr>
                  <th>Asset Name</th>
                  <th>Date acquired</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {table}
              </tbody>
            </table>
          </div>
          <div className="next-prev">
            <button className="bttn" onClick={this.getPrev} disabled={this.disablePrev}>Prev</button>
            <button className="bttn" onClick={this.getNext} disabled={this.disableNext}>Next</button>
          </div>
        </section>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  assets: state.assets.assets,
  assetsAll: state.assets.assetsAll,
  countAssets: state.assets.countAssets
})


export default connect(mapStateToProps, { fetchAssets, countAssets })(AssetDetails)
