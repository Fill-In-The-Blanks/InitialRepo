import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import module from './module';
import employee from './employee';
import timetable from './timetable';
import venue from './venue';

export default combineReducers({
  alert,
  auth,
  module,
  employee,
  timetable,
  venue,
});

// this gets imported in the store.js file
