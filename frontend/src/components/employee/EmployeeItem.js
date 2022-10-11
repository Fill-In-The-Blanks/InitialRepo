import React, { Fragment,useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteEmployee } from '../../actions/employee';
import jsPDF from 'jspdf';
import logo from '../../img/sllit logo.png'
import autoTable from 'jspdf-autotable';
import MyChart from '../Mychart';


const pdfGenerate =(e)=>{
  var doc=new jsPDF('landscape','px','a4','false');
  doc.addImage(logo,'PNG',90,50,100,80);
  autoTable(doc, { html: '#employee-table' })
  doc.save('Employee_List.pdf')
}



  

const EmployeeItem = ({ employees, deleteEmployee }) => {
  
  
  const [value,SetValue]=useState('');
  const [dataSource,SetdataSource]=useState(employees);
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
  const handleGraph = (index)=>{
    console.log(index)
    let chart = document.getElementById(`chart-${index}`)
    if(chart.style.display === "")
    {
      chart.style.display = 'none'
    }
    else{
      chart.style.display = ""
    }

  }

  const employeesMapped =  value.length > 0 ? tableFilter.map((employee,index) => (

    <tr key={employee._id}>
      <td>{employee.empNo}</td>
      <td>{employee.empName}</td>
      <td>{employee.sliitEmail}</td>
      <td>{employee.phone}</td>
      <td>{employee.department}</td>
      <td>{employee.vacancyStatus}</td>
      <td>
        {' '}
        <button
          className='btn btn-danger'
          onClick={() => deleteEmployee(employee._id)}
        >
          <i className='fas fa-trash'></i>
        </button>
      </td>
      <td>
        <Link
          to={`/updateEmployee/${employee._id}`}
          className='btn btn-success'
        >
          <i className='fas fa-edit'></i>
        </Link>
      </td>
    </tr>

  )): employees.map((employee,index) => (
   <> <tr key={employee._id}>
      <td>{employee.empNo}</td>
      <td>{employee.empName}</td>
      <td>{employee.sliitEmail}</td>
      <td>{employee.phone}</td>
      <td>{employee.department}</td>
      <td>{employee.vacancyStatus}</td>
      <td>
        {' '}
        <button
          className='btn btn-danger'
          onClick={() => deleteEmployee(employee._id)}
        >
          <i className='fas fa-trash'></i>
        </button>
      </td>
      <td>
        <Link
          to={`/updateEmployee/${employee._id}`}
          className='btn btn-success'
        >
          <i className='fas fa-edit'></i>
        </Link>
      </td>
      <td>
        <button className='btn btn-primary' onClick = {()=>{
      console.log(index)
      handleGraph(index)}}>
          Hours
        </button>
      </td>
    </tr>
      <tr ><td colSpan={8} id={`chart-${index}`} style = {{display : "none" }} ><MyChart empNo = {employee.empNo} /></td></tr></>
  ))
  return (
    <Fragment>
       <div className='search'>         
    
     <input type='text' 
        placeholder='Search'
    
      value={value}
      onChange={filterData}/>
   </div>
   <Link to={`/employeeManagement`}>
          <button className="btn btn-success" style={{ marginBottom: "5px" }}>
            + Add New
          </button>
        </Link>

        <button className='btn btn-success' onClick={pdfGenerate}><i className='fas fa-file-download'></i> PDF</button>
  
      <table className='table' id='employee-table'>
        <thead>
          <tr>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Employee Number
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Name
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              SLIIT Email
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Phone Number
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Department
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Vacancy Status
            </th>
          </tr>
        </thead>
        <tbody>{employeesMapped}</tbody>
      </table>
    </Fragment>
  );
};

EmployeeItem.propTypes = {
  employees: PropTypes.array.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
};

export default connect(null, { deleteEmployee })(EmployeeItem); 
