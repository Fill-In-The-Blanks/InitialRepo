import axios from 'axios';
import { setAlert } from './alert';
// Add Modules
export const Venue = (formData) => async (dispatch) => {
    const config = {
      headers: {
       
        'Content-Type':'application/json',
  
      },
    };
    
    
    try {
      await axios.post('/api/venues',formData,config);
  
      dispatch(setAlert("Venue Added Success",'success'));
      //navigate('/ListModules');
      
      
  
      
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch((setAlert(error.msg, 'danger'))));
      }
  
     
    }
  };
  