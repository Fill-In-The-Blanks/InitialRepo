import axios from "axios";
import { setAlert } from "./alert";
//import { GET_NOTICE, GET_NOTICES, MODULE_ERROR } from './types';

export const Notices = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    
    await axios.post("/api/notices", formData, config);

    dispatch(setAlert("Notice Added Success", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
