import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { fetchUserDetails } from '../actions/auth';

export class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    const userId = this.props.match.params['id'];
    if (localStorage.getItem('userToken') && localStorage.getItem('userId')) {
      this.props.fetchUserDetails(userId);
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
          <img src={require("../assets/images/spinner.svg")} className={this.state.loading && !this.props.userDetails.name ? 'loader-img' : 'hide'} alt="+" />
        </div>
        <Header />
        <div className="go-back mt-5" onClick={this.back}>
          <img src={require("../assets/images/back.svg")} alt="<<<" />
          <span>Back</span>
        </div>
        {this.props.userDetails ?
          <div className="col-lg-12 p-0">
            <section>
              <div className="container">
                <div className="row">
                  <div className="col-lg-4 p-5">
                    <div className="text-block">
                      <h1 className="title">User details</h1>
                    </div>
                  </div>
                  <div className="col-lg-8 p-5 others">
                    <div className={this.props.userDetails.name ? "text-block" : 'hide'}>
                      <h4>Name</h4>
                      <p>{this.props.userDetails.name}</p>
                    </div>
                    <div className={this.props.userDetails.email ? "text-block" : 'hide'}>
                      <h4>Email</h4>
                      <p><a href={`mailTo:${this.props.userDetails.email}`}>{this.props.userDetails.email}</a></p>
                    </div>
                    <div className={this.props.userDetails.type ? "text-block" : 'hide'}>
                      <h4>Type</h4>
                      <p className="uppercase">{this.props.userDetails.type}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div> :
          ''}
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  userDetails: state.auth.userDetails
})

export default connect(mapStateToProps, { fetchUserDetails })(UserDetails)
