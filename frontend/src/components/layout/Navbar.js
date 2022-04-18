import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading, admin }, logout }) => {
  const adminLinks = (
    <ul>
      <li>
        <Link to='/adminDashboard' style={{ background: 'green' }}>
          <i className='fas fa-user'></i>{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      
        <li>
          <a
            onClick={logout}
            href='/'
            style={{ /* color: '#fff',  */ background: 'red' }}
          >
            <i className='fa fa-sign-out'></i>{' '}
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
            <i className='fas fa-file'></i> SLIIT IAS
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
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
