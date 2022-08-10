import React, { Fragment,useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteModule } from '../../actions/modules_auth';
import jsPDF from 'jspdf';
import logo from '../../img/sllit logo.png'
import autoTable from 'jspdf-autotable';
const pdfGenerate =(e)=>{
  var doc=new jsPDF('landscape','px','a4','false');
  doc.addImage(logo,'PNG',100,200,400,200);
  autoTable(doc, { html: '#module-table' })
  doc.save('Module_List.pdf')
}
const ModuleItem = ({ module, deleteModule }) => {

  
  const [value,SetValue]=useState('');
  const [dataSource,SetdataSource]=useState(module);
  const [tableFilter,SetTableFilter]=useState([]);
  
  const filterData=(e)=>{
    if(e.target.value!=""){
      SetValue(e.target.value);
      const filter=dataSource.filter(o=>Object.keys(o).some(k=>String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())));
      SetTableFilter([...filter]);
    }else{
      SetValue(e.target.value);
      SetdataSource([...dataSource]);
    }

  }
  
  const modules =  value.length > 0 ? tableFilter.map((mod) => (
    
    <tr key={mod._id}>
      <td>{mod.moduleName}</td>
      <td>{mod.ModuleID}</td>
      <td>{mod.specialization}</td>
      <td>{mod.year}</td>
      <td>{mod.semester}</td>
      
        {' '}
        <button
          className='btn btn-danger'
          onClick={() => deleteModule(mod._id)}
        >
          Delete{' '}
        </button>
      
      
        <Link to={`/EditModules/${mod._id}`}>
          <button className='btn btn-success'>Edit</button>
        </Link>
      
    </tr>
  )):  module.map((mod) => (
    
  <tr key={mod._id}>
   <td>{mod.moduleName}</td>
  <td>{mod.ModuleID}</td>
   <td>{mod.specialization}</td>
  <td>{mod.year}</td>
  <td>{mod.semester}</td>
  
  {' '}
  <button
  className='btn btn-danger'
  onClick={() => deleteModule(mod._id)}
   >
  Delete{' '}
   </button>
  
  <Link to={`/EditModules/${mod._id}`}>
  <button className='btn btn-success'>Edit</button>
  </Link>
  
  </tr>
  ))
  
  return (
    
    <Fragment>
      <p className='lead'> Module Management</p>
     
            
             
      <div>
    <input type='text' 
    placeholder='Search'
    value={value}
    onChange={filterData}/>
  </div>
  
      <table className='table' id='module-table'>
        <thead>
          <tr>
            <th>Module Name</th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              Module code
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              specialization
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              Year
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              semester
            </th>
            
            
            
        
            <button className='btn btn-success' onClick={pdfGenerate}>Download PDF</button>
        
            
          </tr>
        </thead>
        <tbody>{modules}</tbody>
      </table>
      
    </Fragment>
  );
};

ModuleItem.propTypes = {
  module: PropTypes.array.isRequired,
  deleteModule: PropTypes.func.isRequired,
 
};

export default connect(null, { deleteModule})(ModuleItem);
