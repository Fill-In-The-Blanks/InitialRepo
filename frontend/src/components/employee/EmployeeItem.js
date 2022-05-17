import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteEmployee } from '../../actions/employee';

const EmployeeItem = ({ employees, deleteEmployee }) => {
  const employeesMapped = employees.map((employee) => (
    <tr key={employee._id}>
      <td>{employee.empNo}</td>
      <td>{employee.empName}</td>
      <td>{employee.sliitEmail}</td>
      <td>{employee.phone}</td>
      <td>{employee.department}</td>
      <td>{employee.vacancyStatus}</td>
      <td>
        {' '}
        <button
          className='btn btn-danger'
          onClick={() => deleteEmployee(employee._id)}
        >
          Delete{' '}
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      {/* <p className='lead'> Module Management</p> */}
      <table className='table'>
        <thead>
          <tr>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              Employee Number
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              Name
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              SLIIT Email
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              Phone Number
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              Department
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              Vacancy Status
            </th>
          </tr>
        </thead>
        <tbody>{employeesMapped}</tbody>
      </table>
    </Fragment>
  );
};

EmployeeItem.propTypes = {
  employees: PropTypes.array.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
};

export default connect(null, { deleteEmployee })(EmployeeItem);
