import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const InstructorDashboard = ({ auth: { instructor } }) => {
  return (
    <Fragment>
      <h1 className='large text-primary center-text'>
        Hello {instructor && instructor.userName}
      </h1>
      <p className='lead center-text'>
        {/* <i className='fas fa-user'></i> */} Let's get started
      </p>
      <p className='lead'>
        {/* <i className='fas fa-user'></i> */} Managements
      </p>

      {
        <Link className='btn EmailManagement' to='/EmailManagement'></Link>

        /* <Link className='btn empManagement' to='/employeeManagement'></Link>
      <Link className='btn moduleManagement' to='/ListModules'></Link>
      <Link className='btn initialConfig' to='/initialConfig'></Link>
      <Link className='btn VenueManagement' to='/ListVenues'></Link>
      <Link className='btn NoticesManagement' to='/AddNotice'></Link> */
      }
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(InstructorDashboard);
