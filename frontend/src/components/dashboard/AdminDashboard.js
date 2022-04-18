import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const AdminDashboard = ({ auth: { admin } }) => {
  return (
    <Fragment>
      <h1 className='large text-primary center-text'>
        Hello {admin && admin.userName}
      </h1>
      <p className='lead center-text'>
        {/* <i className='fas fa-user'></i> */} Let's get started
      </p>
      <p className='lead'>
        {/* <i className='fas fa-user'></i> */} Managements
      </p>

      <Link to='/addmodules' className='btn btn-light'>
        Add Module
      </Link>

      <Link className='btn empManagement' to='/employeeManagement'></Link>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminDashboard);
