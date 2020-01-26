import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import globals from '../globals';
import { fetchSocials } from '../actions/socials';

export class Socials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    if(localStorage.getItem('userToken') && localStorage.getItem('userId')) {
      this.props.fetchSocials();
    } else {
      this.props.history.push('/login');
    }
  }

  back = () => {
    this.props.history.go(-1);
  }

  render() {
    let table = [];
    if (this.props.socials[0]) {
      this.props.socials[0].forEach((social, i) => {
        table.push(
          <tr key={i}>
            <td>{globals.trimTr(social.data.screen_name ? social.data.screen_name : social.data.name || social.data.username || (social.data.firstName + ' ' + social.data.lastName))}</td>
            <td>{social.type}</td>
            <td>
              <Link to={`/socials/social-data/${social._id}`}>View</Link>
            </td>
          </tr>
        )
      })
    }
    return (
      <>
        <div className={'data-loading'}>
          <img src={require("../assets/images/spinner.svg")} className={this.state.loading && !this.props.socials.length ? 'loader-img' : 'hide'} alt="+" />
        </div>
        <Header />
        <div className="go-back mt-5" onClick={this.back}>
          <img src={require("../assets/images/back.svg")} alt="<<<" />
          <span>Back</span>
        </div>
        <section className="table-toppings">
          <h1 className="text-center component-header mb-5">Social networks</h1>
          <div className="tbl-header">
            <table>
              <thead>
                <tr>
                  <th>Account name</th>
                  <th>Account type</th>
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
  socials: state.socials.socials
})

export default connect(mapStateToProps, { fetchSocials })(Socials)
