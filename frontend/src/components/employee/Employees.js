import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getEmployees } from '../../actions/employee';
import EmployeeItem from './EmployeeItem';

const Employees = ({ getEmployees, employee: { employees } }) => {
  useEffect(() => {
    getEmployees();
  }, []);
  return (
    <Fragment>
      <section className='container container-margin-top-override'>
        <p className='lead'>
          {/* <i className='fas fa-user'></i> */} Employee Management
        </p>

        <Link to={`/employeeManagement`}>
          <button className='btn btn-primary' style={{ marginBottom: '5px' }}>
            Add Employees
          </button>
        </Link>
        <Link to={`/listEmployees`}>
          <button className='btn btn-primary'>List Employees</button>
        </Link>

        {employees.length > 0 ? (
          <EmployeeItem employees={employees} />
        ) : (
          <h4>No employees found</h4>
        )}
      </section>
    </Fragment>
  );
};

Employees.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  employee: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  employee: state.employee,
  auth: state.auth,
});

export default connect(mapStateToProps, { getEmployees })(Employees);
