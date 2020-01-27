import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import globals from '../globals';
import { fetchStaffs } from '../actions/auth';

export class Staffs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    if(localStorage.getItem('userToken') && localStorage.getItem('userId')) {
      this.props.fetchStaffs();
    } else {
      this.props.history.push('/login');
    }
  }

  back = () => {
    this.props.history.go(-1);
  }

  render() {
    let table = [];
    if (this.props.staffs[0]) {
      this.props.staffs[0].forEach((staff, i) => {
        table.push(
          <tr key={i}>
            <td>{globals.trimTr(staff.name)}</td>
            {/* <td>{staff.email || 'n/A'}</td>
            <td>{staff.tel || 'n/A'}</td> */}
            <td>{globals.trimTr(staff.position) || 'n/A'}</td>
            {/* <td>{globals.formatDate(staff.date_joined) || 'n/A'}</td> */}
            <td>
              <Link to={`/staffs/staff-data/${staff._id}`}>View</Link>
            </td>
          </tr>
        )
      })
    }
    return (
      <>
        <div className={'data-loading'}>
          <img src={require("../assets/images/spinner.svg")} className={this.state.loading && !this.props.staffs.length ? 'loader-img' : 'hide'} alt="+" />
        </div>
        <Header />
        <div className="go-back mt-5" onClick={this.back}>
          <img src={require("../assets/images/back.svg")} alt="<<<" />
          <span>Back</span>
        </div>
        <section className="table-toppings">
          <h1 className="text-center component-header mb-5">Human assets</h1>
          <div className="tbl-header">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  {/* <th>Email</th>
                  <th>Phone number</th> */}
                  <th>Position</th>
                  {/* <th>Date joined</th> */}
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
  staffs: state.auth.staffs
})

export default connect(mapStateToProps, { fetchStaffs })(Staffs)
