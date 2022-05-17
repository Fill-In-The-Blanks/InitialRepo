import axios from 'axios';
import { setAlert } from './alert';
import { EMPLOYEE_ERROR, GET_EMPLOYEES } from './types';

export const addEmployee = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/employee', formData, config);

    dispatch(setAlert('Employee added', 'success'));

    /* history.push('/adminDashboard'); */
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// add using excel sheet
export const addEmployees = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    /* console.log(formData); */

    const res = await axios.post('/api/employee/employees', formData, config);

    /* dispatch(setAlert('Employee added', 'success')); */
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// @Desc  Retrieve all employees
export const getEmployees = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/employee');

    dispatch({
      type: GET_EMPLOYEES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EMPLOYEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
