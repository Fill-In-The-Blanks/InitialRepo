import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Landing = ({ isAuthenticated }) => {
  // Redirect if logged in
  if (isAuthenticated) {
    return <Navigate to='/adminDashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Instructor Allocation System</h1>
          <p className='lead'></p>
          <div className='buttons'>
            {/* <a href="register.html" className="btn btn-primary">Sign Up</a> */}
            <Link to='/Instructorlogin' className='btn btn-light'>
              Login
            </Link>
            {/* <Link to="/addEmployee" className="btn btn-light">Test</Link> */}
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
