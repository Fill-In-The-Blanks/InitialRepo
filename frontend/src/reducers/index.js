import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import module from './module';


export default combineReducers({
  alert,
  auth,
  module
});

// this gets imported in the store.js file
