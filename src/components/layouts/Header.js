import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  logout = () => {
    localStorage.setItem('userToken', '');
    localStorage.setItem('userId', '');
    window.location.reload();
  }
  render() {
    return (
      <>
        <div className="row p-0">
          <div className="col-lg-12 p-0">
            <div className="nav-container">
              <nav className="bar bar--sm bg--dark" id="menu4">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="bar__module">
                        <a href="index.html">
                          <img className="logo logo-dark" alt="logo" src="img/logo-dark.png" />
                        </a>
                      </div>
                    </div>
                    <div className="ml-auto">
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
  user: state.auth.user
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
