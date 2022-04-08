import React, { Fragment } from 'react';
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
import AddEmployee from './components/employee/AddEmployee';

//Redux
import { Provider } from 'react-redux'; // the providers connects react and redux since they are not the same thing
import store from './store';

const Contained = () => {
  return (
    <>
      <section className='container'>
        <Outlet />
      </section>
    </>
  );
};

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Landing />} />
          {/* Encompassing the routes inside a contained route to move the elements towards the centre of the page */}
          <Route element={<Contained />}>
            <Route path='/login' element={<Login />} />
            {/* <Route path='/addEmployee' element={<AddEmployee />} /> */}
          </Route>
        </Routes>
      </Fragment>
    </Router>
  </Provider> /* Everything is wrapped in a provider so that the components can access app level state */
);

export default App;
