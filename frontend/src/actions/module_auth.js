import axios from 'axios';
import { setAlert } from './alert';
import {
 
  MODULE_SUCCESS,
  MODULE_EXISTS,
  ADMIN_LOADED,
  AUTH_ERROR
  
} from './types';
import setAuthToken from '../utils/setAuthToken';
export const loadAdmin = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/module');

    dispatch({
      type: ADMIN_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};


// Login Admin
export const addModules = (moduleName,ModuleID,specialization,year,semester) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ moduleName,ModuleID,specialization,year,semester });

  try {
    const res = await axios.post('/api/module', body, config);

    dispatch({
      type: MODULE_SUCCESS,
      payload:res.data
    });

    
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: MODULE_EXISTS,
    });
  }
}

