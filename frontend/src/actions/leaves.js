import axios from 'axios';
import { setAlert } from './alert';
import { GET_LEAVES, LEAVE_ERROR } from './types';

export const requestLeave =(formData)=> async (dispatch)=>{

    try{

        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
      
          const res = await axios.post('/api/leaves', formData, config);
      
          dispatch(setAlert('Request Has been Sent', 'success'));

    }catch(err){

        const errors = err.response.data.errors;
        if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

    }

};

// Get all Leaves
export const getLeaves = () => async dispatch => {
  try {
      const res = await axios.get('/api/leaves');
      dispatch({
        type: GET_LEAVES,
        payload: res.data
    });

      
  } catch (err) {
    dispatch({
      type: LEAVE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
  })
  }
};


//delete Leave
export const deleteLeave = id => async dispatch => {
  try {
      await axios.delete(`/api/leaves/${id}`);

      dispatch(setAlert('Leave Removed', 'success'));

      const res = await axios.get('/api/leaves');

      dispatch({
          type: GET_LEAVES,
          payload: res.data
      });  

  } catch (err) {
      dispatch({
          type: LEAVE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status } 
      });
  }
};