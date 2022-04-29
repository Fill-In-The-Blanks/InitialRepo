import axios from 'axios';
import { setAlert } from './alert';

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
