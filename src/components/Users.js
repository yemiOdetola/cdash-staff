import React, { Component } from 'react';
import { connect } from 'react-redux';
import globals from '../globals';
import { Link } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { fetchUsers } from '../actions/auth';

export class Users extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    if (localStorage.getItem('userToken') && localStorage.getItem('userId')) {
      this.props.fetchUsers();
    } else {
      this.props.history.push('/login');
    }
  }

  back = () => {
    this.props.history.go(-1);
  }
  render() {
    let table = [];
    if (this.props.users[0]) {
      this.props.users[0].forEach((user, i) => {
        table.push(
          <tr key={i}>
            <td>{globals.trimTr(user.name)}</td>
            {/* <td>{user.email || 'n/A'}</td> */}
            <td className="uppercase">{globals.capitalize(user.type) || 'n/A'}</td>
            <td>
              <Link to={`/users/user-data/${user._id}`}>View</Link>
            </td>
          </tr>
        )
      })
    }
    return (
      <>
        <div className={'data-loading'}>
          <img src={require("../assets/images/spinner.svg")} className={this.state.loading && !this.props.users.length ? 'loader-img' : 'hide'} alt="+" />
        </div>
        <Header />
        <div className="go-back mt-5" onClick={this.back}>
          <img src={require("../assets/images/back.svg")} alt="<<<" />
          <span>Back</span>
        </div>
        <section className="table-toppings">
          <h1 className="text-center component-header mb-5">All users</h1>
          <div className="tbl-header">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  {/* <th>Email</th> */}
                  <th>User type</th>
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
  users: state.auth.users
})


export default connect(mapStateToProps, { fetchUsers })(Users)
