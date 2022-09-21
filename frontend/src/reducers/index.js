import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import module from './module';
import employee from './employee';
import timetable from './timetable';
import venue from './venue';
import leave from './leave'


export default combineReducers({
  alert,
  auth,
  module,
  employee,
  timetable,
  venue,
  leave
  
});

// this gets imported in the store.js file
