import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { fetchSocialDetails } from '../actions/socials';

export class SocialDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    const socialId = this.props.match.params['id'];
    if(localStorage.getItem('userToken') && localStorage.getItem('userId')) {
      this.props.fetchSocialDetails(socialId);
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
          <img src={require("../assets/images/spinner.svg")} className={this.state.loading && !this.props.socialDetails.data ? 'loader-img' : 'hide'} alt="+" />
        </div>
        <Header />
        <div className="go-back mt-5" onClick={this.back}>
          <img src={require("../assets/images/back.svg")} alt="<<<" />
          <span>Back</span>
        </div>
        {this.props.socialDetails ?
          <div className="col-lg-12 p-0">
            <section>
              <div className="container">
                <div className="row">
                  <div className="col-lg-4 p-5">
                    <div className="text-block">
                      <img className={this.props.socialDetails.type === 'instagram' ? "social" : 'hide'} src={require('../assets/images/instagram.svg')} alt={this.props.socialDetails._id} />
                      <img className={this.props.socialDetails.type === 'linkedin' ? "social" : 'hide'} src={require('../assets/images/linkedin.svg')} alt={this.props.socialDetails._id} />
                      <img className={this.props.socialDetails.type === 'facebook' ? "social" : 'hide'} src={require('../assets/images/facebook.svg')} alt={this.props.socialDetails._id} />
                      <img className={this.props.socialDetails.type === 'twitter' ? "social" : 'hide'} src={require('../assets/images/twitter.svg')} alt={this.props.socialDetails._id} />
                      <h1 className="title">{this.props.socialDetails.data ? this.props.socialDetails.data.name || this.props.socialDetails.data.full_name : 'Social details'}</h1>
                    </div>
                  </div>
                  <div className="col-lg-8 p-5 others">
                    <div className={this.props.socialDetails.data && this.props.socialDetails.data.firstName ? "text-block" : 'hide'}>
                      <h4>Name</h4>
                      <p>{this.props.socialDetails.data ? this.props.socialDetails.data.firstName + ' ' + this.props.socialDetails.data.lastName : 'n/A'}</p>
                    </div>
                    <div className={this.props.socialDetails.data && this.props.socialDetails.data.biography ? "text-block" : 'hide'}>
                      <h4>Biography</h4>
                      <p>{this.props.socialDetails.data ? this.props.socialDetails.data.biography : ''}</p>
                    </div>
                    <div className={this.props.socialDetails.data && this.props.socialDetails.data.edge_followed_by && this.props.socialDetails.data.edge_followed_by.count ? "text-block" : 'hide'}>
                      <h4>Followers</h4>
                      <p className="uppercase">{this.props.socialDetails.data ? this.props.socialDetails.data.edge_followed_by.count : 'n/A'}</p>
                    </div>
                    <div className={this.props.socialDetails.data && this.props.socialDetails.data.edge_follow && this.props.socialDetails.data.edge_follow.count ? "text-block" : 'hide'}>
                      <h4>Following</h4>
                      <p className="uppercase">{this.props.socialDetails.data ? this.props.socialDetails.data.edge_follow.count : 'n/A'}</p>
                    </div>
                    <div className={this.props.socialDetails.data && this.props.socialDetails.data.email ? "text-block" : 'hide'}>
                      <h4>Email address</h4>
                      <p className="uppercase">{this.props.socialDetails.data ? this.props.socialDetails.data.email : 'n/A'}</p>
                    </div>
                    <div className={this.props.socialDetails.data && this.props.socialDetails.data.username ? "text-block" : 'hide'}>
                      <h4>Username</h4>
                      <p className="uppercase">{this.props.socialDetails.data ? this.props.socialDetails.data.username : 'n/A'}</p>
                    </div>
                    <div className={this.props.socialDetails.data && this.props.socialDetails.data.screen_name ? "text-block" : 'hide'}>
                      <h4>Screen name</h4>
                      <p className="uppercase">{this.props.socialDetails.data ? this.props.socialDetails.data.screen_name : 'n/A'}</p>
                    </div>
                    <div className={this.props.socialDetails.data && this.props.socialDetails.data.location ? "text-block" : 'hide'}>
                      <h4>Location</h4>
                      <p className="uppercase">{this.props.socialDetails.data ? this.props.socialDetails.data.location : 'n/A'}</p>
                    </div>
                    <div className={this.props.socialDetails.data && this.props.socialDetails.data.followers_count ? "text-block" : 'hide'}>
                      <h4>Followers</h4>
                      <p className="uppercase">{this.props.socialDetails.data ? this.props.socialDetails.data.followers_count : 'n/A'}</p>
                    </div>
                    <div className={this.props.socialDetails.data && this.props.socialDetails.data.friends_count ? "text-block" : 'hide'}>
                      <h4>Following</h4>
                      <p className="uppercase">{this.props.socialDetails.data ? this.props.socialDetails.data.friends_count : 'n/A'}</p>
                    </div>
                    <div className={this.props.socialDetails.data && this.props.socialDetails.data.statuses_count ? "text-block" : 'hide'}>
                      <h4>Number of tweets</h4>
                      <p className="uppercase">{this.props.socialDetails.data ? this.props.socialDetails.data.statuses_count : 'n/A'}</p>
                    </div>
                    <div className={this.props.socialDetails.data && this.props.socialDetails.data.favourites_count ? "text-block" : 'hide'}>
                      <h4>Number of likes</h4>
                      <p className="uppercase">{this.props.socialDetails.data ? this.props.socialDetails.data.favourites_count : 'n/A'}</p>
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
  socialDetails: state.socials.socialDetails
})

export default connect(mapStateToProps, { fetchSocialDetails })(SocialDetails)
