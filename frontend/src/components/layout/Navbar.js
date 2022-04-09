import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Navbar = ({ auth: { isAuthenticated, loading, admin } }) => {
  const adminLinks = (
    <ul>
      <li>
        <Link to='/adminDashboard'>
          <i className='fas fa-user'></i>{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a href='/'>
          <i className='fas fa-sign-out-al'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/login' style={{ color: '#fff', background: '#17a2b8' }}>
          Admin Login
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar bg-light'>
      <h1>
        <Link to='/'>
          <p style={{ float: 'left', color: '#17a2b8' }}>
            <i className='fas fa-code'></i> SLIIT IAS
          </p>
        </Link>
      </h1>
      {!loading && isAuthenticated ? (
        <Fragment>{/* user ? authLinks : */ adminLinks}</Fragment>
      ) : (
        <Fragment>{guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Navbar);
