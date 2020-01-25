import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { fetchStaffDetails } from '../actions/auth';

export class StaffDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    const staffId = this.props.match.params['id'];
    this.props.fetchStaffDetails(staffId);
  }

  render() {
    return (
      <>
        <div className={'data-loading'}>
          <img src={require("../assets/images/spinner.svg")} className={this.state.loading && !this.props.staffDetails ? 'loader-img' : 'hide'} alt="+" />
        </div>
        <Header />
        {this.props.staffDetails ?
          <div className="col-lg-12 p-0">
            <section>
              <div className="container">
                <div className="row">
                  <div className="col-lg-4 p-5">
                    <div className="text-block">
                      <img className={this.props.staffDetails.image ? "staff-img" : 'hide'} src={this.props.staffDetails.image} alt={this.props.staffDetails.name} />
                      <h1 className="title">{this.props.staffDetails.name || 'Staff'} details</h1>
                    </div>
                  </div>
                  <div className="col-lg-8 p-5 others">
                    <div className={this.props.staffDetails.name ? "text-block" : 'hide'}>
                      <h4>Name</h4>
                      <p>{this.props.staffDetails.name}</p>
                    </div>
                    <div className={this.props.staffDetails.email ? "text-block" : 'hide'}>
                      <h4>Email</h4>
                      <p><a href={`mailTo:${this.props.staffDetails.email}`}>{this.props.staffDetails.email}</a></p>
                    </div>
                    <div className={this.props.staffDetails.tel ? "text-block" : 'hide'}>
                      <h4>Phone number</h4>
                      <p><a href={`tel:${this.props.staffDetails.tel}`}>{this.props.staffDetails.tel}</a></p>
                    </div>
                    <div className={this.props.staffDetails.position ? "text-block" : 'hide'}>
                      <h4>Position</h4>
                      <p className="uppercase">{this.props.staffDetails.position}</p>
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
  staffDetails: state.auth.staffDetails
})

export default connect(mapStateToProps, { fetchStaffDetails })(StaffDetails)
