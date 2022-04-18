import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <Fragment>
      <h1 className='large text-primary center-text'>Hello admin name</h1>
      <p className='lead center-text'>
        {/* <i className='fas fa-user'></i> */} Let's get started
      </p>
      <p className='lead'>
        {/* <i className='fas fa-user'></i> */} Managements
      </p>
      <Link className='btn btn-light my-1' to='/employeeManagement'>
        Employee Management
      </Link>
      <Link className='btn empManagement' to='/employeeManagement'>
        Test
      </Link>
    </Fragment>
  );
};

export default AdminDashboard;
