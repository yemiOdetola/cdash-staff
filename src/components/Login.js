import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import globals from '../globals';
import { login } from '../actions/auth';

export class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    }
  }

  handleChange = (key, value) => {
    this.setState({
      [key]: value
    })
  };

  submitForm = (e) => {
    e.preventDefault();
    if (this.state.password === '' || this.state.email === '') {
      return globals.createToast('All fields are compulsory', 3000, 'top');
    }
    globals.createToast('Please wait', 1200, 'bottom-right');
    let payload = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.login(this.props, payload);
  }
  render() {
    return (
      <>

        <div className="container-fluid height-100 auth-bg">
          <div className="auth-logo">
            <Link to='/'>
              {/* <img src={require('../assets/images/logo-white.png')} alt="logo" /> */}
            </Link>
          </div>
          <div className="flex-itemss">
            <div className="col-lg-4 col-md-7 mx-auto">
              <h2 className="component-header">Login</h2>
              <p className="mb-5 text-center">Welcome. Sign in with your account details.</p>
              <form onSubmit={this.submitForm}>
                <div className="row">
                  <div className="col-12 mr-auto">
                    <input type="email" name="email" placeholder="Email address"
                      onChange={e => this.handleChange("email", e.target.value)} />
                  </div>
                  <div className="col-12 mr-auto mt-3">
                    <input type="password" name="Password" placeholder="Password"
                      onChange={e => this.handleChange("password", e.target.value)} />
                  </div>
                  <div className="col-lg-12 mr-auto col-sm-10 mt-4">
                    <button type="submit" onClick={this.submitForm} className="btn btn--primary type--uppercase">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      </>
    )
  }
}

export default connect(null, {login})(Login)
