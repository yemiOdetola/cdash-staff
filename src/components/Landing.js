import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

export class Landing extends Component {

  render() {
    return (
      <>
        <Header />
        <div className="row">
          <div className="container-fluid p-0">
            <div className="col-lg-12 p-0">
              <section className="bg--secondary">
                <div className="col-md-12">
                  <div className="heading-block text-center">
                    <h3>All assets</h3>
                  </div>
                  <div className="assets">
                    <div className="each-asset">
                      <div className="title">Summer walking</div>
                      <div className="sub">Bust it down</div>
                      <Link to={`/`}>Some Link</Link>
                    </div>
                    <div className="each-asset">
                      <div className="title">Summer walking</div>
                      <div className="sub">Bust it down</div>
                      <Link to={`/`}>Some Link</Link>
                    </div>
                    <div className="each-asset">
                      <div className="title">Summer walking</div>
                      <div className="sub">Bust it down</div>
                      <Link to={`/`}>Some Link</Link>
                    </div>
                    <div className="each-asset">
                      <div className="title">Summer walking</div>
                      <div className="sub">Bust it down</div>
                      <Link to={`/`}>Some Link</Link>
                    </div>
                    <div className="each-asset">
                      <div className="title">Summer walking</div>
                      <div className="sub">Bust it down</div>
                      <Link to={`/`}>Some Link</Link>
                    </div>
                    <div className="each-asset">
                      <div className="title">Summer walking</div>
                      <div className="sub">Bust it down</div>
                      <Link to={`/`}>Some Link</Link>
                    </div>
                    <div className="each-asset">
                      <div className="title">Summer walking</div>
                      <div className="sub">Bust it down</div>
                      <Link to={`/`}>Some Link</Link>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => ({

})


export default connect(mapStateToProps, {})(Landing)
