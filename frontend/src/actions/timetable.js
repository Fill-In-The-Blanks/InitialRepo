import axios from 'axios';
import { setAlert } from './alert';

// add using excel sheet
export const addTimetableSheet = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    /* console.log(formData); */
    const res = await axios.post('/api/timetable/slots', formData, config);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};
