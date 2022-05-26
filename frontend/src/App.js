import React, { Fragment, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import EmployeeManagement from './components/employee/EmployeeManagement';
import Employees from './components/employee/Employees';
import UpdateEmployee from './components/employee/UpdateEmployee';
import TimetableManagement from './components/timetable/TimetableManagement';
import Alert from './components/layout/Alert';
import AdminDashboard from './components/dashboard/AdminDashboard';
import AddModule from './components/Modules/AddModules';
import List from './components/Modules/Modules';
import EditModule from './components/Modules/EditModule';
import InitialConfig from './components/initialConfig/InitialConfig';
import AddVenue from './components/Venue/AddVenue';

import SlotsConfirmationDialog from './components/dialogBox/SlotsConfirmationDialog';

/* import { useNavigate } from 'react-router-dom'; */
import setAuthToken from './utils/setAuthToken';

import { loadAdmin } from './actions/auth';

//Redux
import { Provider } from 'react-redux'; // the providers connects react and redux since they are not the same thing
import store from './store';

const Contained = () => {
  return (
    <>
      {/* <section className='landing landing-modified'> */}
      <section
        className='container'
        /* style={{ borderStyle: 'solid', borderColor: 'red' }} */
      >
        <Alert />
        <Outlet />
      </section>
      {/* </section> */}
    </>
  );
};

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadAdmin()); // we have access to store and dispatch is a function of store
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Landing />} />
            {/* Encompassing the routes inside a contained route to move the elements towards the centre of the page */}
            <Route element={<Contained />}>
              <Route path='/login' element={<Login />} />
              <Route
                path='/employeeManagement'
                element={<EmployeeManagement />}
              />
              <Route
                path='/timetableManagement'
                element={<TimetableManagement />}
              />
              <Route path='/adminDashboard' element={<AdminDashboard />} />
              <Route path='/addModules' element={<AddModule />} />
              <Route path='/ListModules' element={<List />} />
              <Route path='/EditModules' element={<EditModule />} />
              <Route path='/EditModules/:id' element={<EditModule />} />
              <Route path='/initialConfig' element={<InitialConfig />} />
              <Route path='/listEmployees' element={<Employees />} />
              <Route path='/updateEmployee/:id' element={<UpdateEmployee />} />
              <Route path='/AddVenues' element={<AddVenue />} />
              <Route
                path='/slotsConfirmation'
                element={<SlotsConfirmationDialog />}
              />
            </Route>
          </Routes>
        </Fragment>
      </Router>
    </Provider> /* Everything is wrapped in a provider so that the components can access app level state */
  );
};

export default App;
