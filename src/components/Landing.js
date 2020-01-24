import React, { Component } from 'react';
import { connect } from 'react-redux';
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
                    <div className="row">
                      <div className="col-md-4">
                        <div className="feature feature-1 boxed boxed--border">
                          <span className="label">Fulltime</span>
                          <h5>Front-end Designer</h5>
                          <p>
                            Squarespace Inc.
                                </p>
                          <a href="#">
                            View &amp; Apply
                                </a>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="feature feature-1 boxed boxed--border">
                          <span className="label bg--primary-2">Remote</span>
                          <h5>Art Director</h5>
                          <p>
                            Hobson &amp; Peterson
                                </p>
                          <a href="#">
                            View &amp; Apply
                                </a>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="feature feature-1 boxed boxed--border">
                          <h5>Senior Interface Designer</h5>
                          <p>
                            Supply Co. (NYC)
                                </p>
                          <a href="#">
                            View &amp; Apply
                                </a>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="feature feature-1 boxed boxed--border">
                          <h5>Design Internship</h5>
                          <p>
                            Instrument San Francisco
                                </p>
                          <a href="#">
                            View &amp; Apply
                                </a>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="feature feature-1 boxed boxed--border">
                          <h5>Graphic Designer (Junior)</h5>
                          <p>
                            Paddle Financial
                                </p>
                          <a href="#">View &amp; Apply</a>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="feature feature-1 boxed boxed--border">
                          <span className="label">Fulltime</span>
                          <h5>Expression Engine Expert</h5>
                          <p>
                            Hoëffler
                                </p>
                          <a href="#">
                            View &amp; Apply
                                </a>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="feature feature-1 boxed boxed--border">
                          <span className="label bg--primary-2">Remote</span>
                          <h5>Full-stack Developer</h5>
                          <p>
                            Envato
                                </p>
                          <a href="#">
                            View &amp; Apply
                                </a>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="feature feature-1 boxed boxed--border">
                          <h5>Marketing Director</h5>
                          <p>
                            Clear Left
                                </p>
                          <a href="#">
                            View &amp; Apply
                                </a>
                        </div>
                      </div>
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
