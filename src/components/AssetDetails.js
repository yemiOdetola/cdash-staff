import React, { Component } from 'react';
import { connect } from 'react-redux';
import globals from '../globals';
import { Link } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { fetchAssets } from '../actions/assets';


export class AssetDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    const assetId = this.props.match.params['id'];
    this.props.fetchAssets(assetId);
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
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  assets: state.assets.assets
})


export default connect(mapStateToProps, { fetchAssets })(AssetDetails)
