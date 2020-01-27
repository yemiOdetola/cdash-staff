import React, { Component } from 'react';
import { connect } from 'react-redux';
import globals from '../globals';
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
    if(localStorage.getItem('userToken') && localStorage.getItem('userId')) {
      this.props.fetchStaffDetails(staffId);
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
          <img src={require("../assets/images/spinner.svg")} className={this.state.loading && !this.props.staffDetails.name ? 'loader-img' : 'hide'} alt="+" />
        </div>
        <Header />
        <div className="go-back mt-5" onClick={this.back}>
          <img src={require("../assets/images/back.svg")} alt="<<<" />
          <span>Back</span>
        </div>
        {this.props.staffDetails ?
          <div className="col-lg-12 p-0">
            <section>
              <div className="container">
                <div className="row">
                  <div className="col-lg-4 p-5">
                    <div className="text-block">
                      <img className={this.props.staffDetails.image ? "staff-img" : 'hide'} src={this.props.staffDetails.image} alt={this.props.staffDetails.name} />
                      <h1 className="title">{this.props.staffDetails.title} {this.props.staffDetails.name || 'Staff details'}</h1>
                    </div>
                  </div>
                  <div className="col-lg-8 p-5 others">
                    {/* <div className={this.props.staffDetails.name ? "text-block" : 'hide'}>
                      <h4>Name</h4>
                      <p>{this.props.staffDetails.name}</p>
                    </div> */}
                    <div className={this.props.staffDetails.email ? "text-block" : 'hide'}>
                      <h4>Email</h4>
                      <p><a href={`mailTo:${this.props.staffDetails.email}`}>{this.props.staffDetails.email}</a></p>
                    </div>
                    <div className={this.props.staffDetails.tel ? "text-block" : 'hide'}>
                      <h4>Phone number</h4>
                      <p><a href={`tel:${this.props.staffDetails.tel}`}>{this.props.staffDetails.tel}</a></p>
                    </div>
                    <div className={this.props.staffDetails.date_joined ? "text-block" : 'hide'}>
                      <h4>Date joined</h4>
                      <p className="uppercase">{globals.formatDate(this.props.staffDetails.date_joined)}</p>
                    </div>
                    <div className={this.props.staffDetails.position ? "text-block" : 'hide'}>
                      <h4>Position</h4>
                      <p className="uppercase">{this.props.staffDetails.position}</p>
                    </div>
                    <div className={this.props.staffDetails.summary ? "text-block" : 'hide'}>
                      <h4>Summary</h4>
                      <p className="uppercase">{this.props.staffDetails.summary}</p>
                    </div>
                    <div className={this.props.staffDetails.alignment_score ? "text-block" : 'hide'}>
                      <h4>Alignment score</h4>
                      <p className="uppercase">{this.props.staffDetails.alignment_score}</p>
                    </div>
                    <div className={this.props.staffDetails.salary ? "text-block" : 'hide'}>
                      <h4>Salary</h4>
                      <p className="uppercase">{this.props.staffDetails.salary}</p>
                    </div>
                    <div className={this.props.staffDetails.experiences ? "text-block" : 'hide'}>
                      <h4>Experiences</h4>
                      <p className="uppercase">{this.props.staffDetails.experiences}</p>
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
