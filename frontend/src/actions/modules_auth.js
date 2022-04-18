import axios from 'axios';
import { setAlert } from './alert';


  

// Login Admin
export const Modules = (formData) => async (dispatch) => {
  const config = {
    headers: {
     
      'Content-Type':'application/json',

    },
  };
  //console.log(config);
  //const body = JSON.stringify({moduleName,ModuleID,specialization,year,semester});
  
  try {
    await axios.post('/api/module',formData,config);

    dispatch(setAlert("Module Added Success",'success'));

    

    
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch((setAlert(error.msg, 'danger'))));
    }

   
  }
};

     
    
