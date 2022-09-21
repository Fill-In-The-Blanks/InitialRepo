import React, { Fragment,useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteLeave } from '../../actions/leaves';
const LeaveItem = ({leave,deleteLeave}) => {

  
    const [value,SetValue]=useState('');
    const [dataSource,SetdataSource]=useState(leave);
    const [tableFilter,SetTableFilter]=useState([]);
    //const [sortvalue,SetsortValue]=useState('');
    
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



    const leaves =  value.length > 0 ? tableFilter.map((item) => (
    
        <tr key={item._id}>
          <td>{item.empNo}</td>
          <td>{item.empName}</td>
          <td>{item.CordinatorEmail}</td>
          <td>{item.date}</td>
          <td>{item.starttimeoff}</td>
          <td>{item.Endtimeoff}</td>
          <td>{item.Message}</td>
          <td>{item.NumberofDays}</td>
          <td>{item.status}</td>
          <td>
            {' '}
            <button
              className='btn btn-danger'
            onClick={() => deleteLeave(item._id)}
            >
              Delete{' '}
            </button>
          
          </td>
          
        </tr>
      )):  leave.map((item) => (
        
        <tr key={item._id}>
        <td>{item.empNo}</td>
        <td>{item.empName}</td>
        <td>{item.CordinatorEmail}</td>
        <td>{item.date}</td>
        <td>{item.starttimeoff}</td>
        <td>{item.Endtimeoff}</td>
        <td>{item.Message}</td>
        <td>{item.NumberofDays}</td>
        <td>{item.status}</td>
      <td>
      {' '}
      <button
      className='btn btn-danger'
      onClick={() => deleteLeave(item._id)}
       >
      Delete{' '}
       </button>
       </td>
     
      </tr>
      ))
      return (
    
        <Fragment>
          <p className='lead'> Leave  Management</p>
         
                
                 
          <div>
        <input type='text' 
        placeholder='Search'
        value={value}
        onChange={filterData}/>
      </div>

      <table className='table'>
        <thead>
          <tr>
            <th>Employee No</th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              Employee Name
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
             Cordinator Email
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              Date
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              Start Time
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              End Time
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              Message
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              Number of Days
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              Status
            </th>
            
            
            
            
            
          </tr>
        </thead>
        <tbody>{leaves}</tbody>
      </table>
      
    </Fragment>
  );
};

LeaveItem.propTypes = {
  leave: PropTypes.array.isRequired,
 deleteLeave: PropTypes.func.isRequired,
 
};

export default connect(null,{deleteLeave})(LeaveItem);