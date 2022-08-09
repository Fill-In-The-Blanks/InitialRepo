import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import List from '../Modules/ModuleItem';

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
      <Link className='btn empManagement' to='/employeeManagement'></Link>
      <Link className='btn moduleManagement' to='/ListModules'></Link>
      <Link
        className='btn timeTableManagement'
        to='/timetableManagement'
      ></Link>
      <Link className='btn initialConfig' to='/initialConfig'></Link>
      <Link className='btn VenueManagement' to='/ListVenues'></Link>
      <div className='container' style={{ height: '100vh' }}>
        <Link
          className='rounded float-start m-3 empManagement'
          to='/employeeManagement'
        ></Link>
        <Link
          className='rounded float-start m-3 moduleManagement'
          to='/ListModules'
        ></Link>
        <Link
          className='rounded float-start m-3 initialConfig'
          to='/initialConfig'
        ></Link>
        <Link class='btn' to='/timetableManagement'>
          Timetable Management
        </Link>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminDashboard);
