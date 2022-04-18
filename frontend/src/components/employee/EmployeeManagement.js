import React, { Fragment, useState } from 'react';
import { addEmployee } from '../../actions/employee';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const EmployeeManagement = ({ addEmployee }) => {
  const [formData, setFormData] = useState({
    empNo: '',
    empName: '',
    sliitEmail: '',
    phone: '',
    department: '',
  });

  const { empNo, empName, sliitEmail, phone, department } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addEmployee(formData);
  };

  return (
    <Fragment>
      <section
        className='container container-margin-top-override'
        /* style={{ borderStyle: 'solid', borderColor: 'blue' }} */
      >
        {/* <h1 className='large text-primary'>Employee Management</h1> */}
        <p className='lead'>
          {/* <i className='fas fa-user'></i> */} Employee Management
        </p>

        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Employee Number'
              name='empNo'
              value={empNo}
              onChange={(e) => onChange(e)}
              required
            />
          </div>

          <div className='form-group'>
            <input
              type='text'
              placeholder='Employee Name'
              name='empName'
              value={empName}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className='form-group'>
            <input
              type='email'
              placeholder='Employee SLIIT email'
              name='sliitEmail'
              value={sliitEmail}
              onChange={(e) => onChange(e)}
              required
            />
          </div>

          <div className='form-group'>
            <input
              type='password'
              placeholder='Confirm Password'
              name='password2'
              minLength='6'
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Register' />
        </form>
      </section>
    </Fragment>
  );
};

EmployeeManagement.propTypes = {
  addEmployee: PropTypes.func.isRequired,
};

export default connect(null, { addEmployee })(EmployeeManagement);
