import React, { Fragment, useState } from 'react';
import { addEmployee } from '../../actions/employee';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const EmployeeManagement = ({ addEmployee, auth: { admin } }) => {
  const [formData, setFormData] = useState({
    empNo: '',
    empName: '',
    sliitEmail: '',
    phone: '',
    department: '',
  });
  const navigate = useNavigate();
  const { empNo, empName, sliitEmail, phone, department } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (formData.empName == null || formData.empName == '') {
      Swal.fire({
        icon: 'error',
        title: 'Please Check Form ',
        text: 'Enter Employee Name',
      });
    } else if (formData.phone == null || formData.phone == '') {
      Swal.fire({
        icon: 'error',
        title: 'Please Check Form ',
        text: 'Enter Phone Number. Valid examples: 0771234567, 0763453565, 071-3453455, +94764310985',
      });
    } else if (document.getElementsByName('department')[0].value === '0') {
      Swal.fire({
        icon: 'error',
        title: 'Please Check Form ',
        text: 'Select A Department',
      });
    } else {
      addEmployee(formData, navigate);
    }
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
            Number
            <small className='form-text'>
              Will be rejected if employee number already exists
            </small>
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
            Name
            <input
              type='text'
              placeholder='Employee Name'
              name='empName'
              value={empName}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className='form-group'>
            SLIIT email
            <small className='form-text'>
              Will be rejected if employee email already exists
            </small>
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
            Phone Number
            <small className='form-text'>
              Will be rejected if phone number is already used
            </small>
            <input
              type='text'
              placeholder='Phone number'
              name='phone'
              value={phone}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className='form-group'>
            Department
            <small className='form-text'>Departments in computing only</small>
            <select
              name='department'
              value={department}
              onChange={(e) => onChange(e)}
            >
              <option value='0'>Select the department</option>
              {/* If coordinator is of CSSE or is a FOC admin then render CSSE option */}
              {(admin?.department === 'CSSE' ||
                admin?.department === 'admin') && (
                <option value='CSSE'>
                  Computer Science & Software Engineering (CSSE)
                </option>
              )}
              {/* If coordinator is of IT or is a FOC admin then render IT option */}
              {(admin?.department === 'IT' ||
                admin?.department === 'admin') && (
                <option value='IT'>Information Technology (IT)</option>
              )}
              {/* If coordinator is of CSE or is a FOC admin then render CSE option */}
              {(admin?.department === 'CSE' ||
                admin?.department === 'admin') && (
                <option value='CSE'>Computer Systems Engineering (CSE)</option>
              )}
            </select>
          </div>
          <input type='submit' className='btn btn-primary' value='Confirm' />
          <Link to={`/listEmployees`}>
            <button className='btn btn-primary'>Cancel</button>
          </Link>
        </form>
      </section>
    </Fragment>
  );
};

EmployeeManagement.propTypes = {
  addEmployee: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addEmployee, setAlert })(
  EmployeeManagement
);
