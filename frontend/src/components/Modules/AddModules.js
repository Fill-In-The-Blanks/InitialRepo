import React, { Fragment, useState } from 'react';

import { connect } from 'react-redux';
import { Modules } from '../../actions/modules_auth';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom"

const AddModule = ({ Modules}) => {
  const [formData, setFormData] = useState({
    moduleName: '',
    ModuleID: '',
    specialization: '',
    year: '',
    semester: '',
  });
  const navigate = useNavigate();
  const { moduleName, ModuleID, specialization, year, semester } = formData;
  const onchange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onsubmit = async (e) => {
    e.preventDefault();
    //console.log(formData);
    Modules(formData,navigate);
  };
  return (
    <Fragment>
      <section className='container container-margin-top-override'>
        {/* <h1 className='large text-primary'>Module Management</h1> */}
        <p className='lead'> Module Management</p>
        <form className='form' onSubmit={(e) => onsubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Name'
              name='moduleName'
              value={moduleName}
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Module Code'
              name='ModuleID'
              value={ModuleID}
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Specialization'
              name='specialization'
              value={specialization}
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Year Of Study'
              name='year'
              value={year}
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Semester'
              name='semester'
              value={semester}
              onChange={(e) => onchange(e)}
            />
          </div>


           <input type='submit' className='btn btn-primary' value='Confirm' />
          <Link to='/adminDashboard'>
            <input type='reset' className='btn btn-primary' value='Cancel' />
          </Link>
        </form>
      </section>
    </Fragment>
  );
};

AddModule.propTypes = {
  Modules: PropTypes.func.isRequired,
};

export default connect(null, { Modules })(AddModule);
