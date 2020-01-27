import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrgdetails } from '../../actions/auth';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    this.props.getOrgdetails();
  }
  color = '#333';
  logo = '';
  logout = () => {
    localStorage.setItem('userToken', '');
    localStorage.setItem('userId', '');
    window.location.reload();
  }
  render() {
    if (this.props.orgDetails && this.props.orgDetails.logo) {
      this.logo = this.props.orgDetails.logo;
    }
    if (this.props.orgDetails && this.props.orgDetails.color) {
      this.color = this.props.orgDetails.color;
    }
    return (
      <>
        <div className="row p-0">
          <div className="col-lg-12 p-0">
            <div className="nav-container">
              <nav className="bar bar--sm" style={{backgroundColor: this.color}} id="menu4">
                <div className="container">
                  <div className="row">
                    <div className="logo-bar pl-5">
                      <div className="bar__module">
                        <a href="/">
                          <img className="logo" alt="logo" src={this.logo} />
                        </a>
                      </div>
                    </div>
                    <div className="ml-auto pr-5">
                      <div className="bar__module">
                        <ul className="menu-horizontal">
                          <li className={!this.props.user ? "dropdown bttn login" : 'visibility-hidden'}>
                            <Link to="/login"> Login </Link>
                          </li>
                          <li className={this.props.user ? "dropdown bttn logout" : 'visibility-hidden'} onClick={this.logout}>
                            <span> Logout </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  orgDetails: state.auth.orgDetails
})


export default connect(mapStateToProps, {getOrgdetails})(Header)
