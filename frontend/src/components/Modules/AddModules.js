import React, { Fragment, useState } from 'react'

import { connect } from 'react-redux';

import { addModules } from '../../actions/module_auth';
import PropTypes from 'prop-types';
const AddModule = ({addModules}) => {
    const[formData,setFormData] = useState({
        moduleName:'',
        ModuleID:'',
        specialization:'',
        year: '',
        semester:''

    });

    const {moduleName,ModuleID,specialization,year,semester}= formData;
    const onchange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        //console.log(formData);
        addModules({moduleName,ModuleID,specialization,year,semester});
    
        
    };
  return (
    <Fragment>
        <section className="container">
      <h1 className="large text-primary">Module Management</h1>
      <p className="lead"> Add New module</p>
      <form className="form" onSubmit={(e) => onSubmit(e)} >
        <div className="form-group">
          <input type="text" placeholder="Name" 
          name="moduleName" 
          value={moduleName}
          onChange={e=>onchange(e)}
          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Module Code" name="ModuleID"
          value={ModuleID}
          onChange={e=>onchange(e)}
           />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Specialization" name="specialization" 
          value={ specialization}
          onChange={e=>onchange(e)}
          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Year Of Study" name="year" 
          value={year}
          onChange={e=>onchange(e)}
           />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Semester" name="semester" 
          value={semester}
          onChange={e=>onchange(e)}
          />
         
        </div>
       
        <input type="submit" className="btn btn-primary" value="Confirm" />
        <input type="reset" className="btn btn-primary" value="Cancel" />
      </form>
      
    </section>
    </Fragment>
  )
}

AddModule.propTypes={
   
    addModules:PropTypes.func.isRequired

}

export default connect(null,{addModules})(AddModule);
