import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";

import module from "./module";
import employee from "./employee";
import timetable from "./timetable";
import venue from "./venue";
import admin from "./admin";
import instructor from "./instructor";
import profile from "./profile";
/* import notice from './notice'; */

export default combineReducers({
  alert,
  auth,
  module,
  employee,
  instructor,
  profile,
  admin,
  timetable,
  venue,
  /*   notice, */
});

// this gets imported in the store.js file
