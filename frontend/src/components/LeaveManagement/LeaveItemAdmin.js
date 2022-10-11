import React, { Fragment,useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link ,useNavigate} from 'react-router-dom';
import { deleteLeave,updatestatusByID} from '../../actions/leaves';
import  axios  from 'axios';
import jsPDF from 'jspdf';
import logo from '../../img/sllit logo.png'
import autoTable from 'jspdf-autotable';


const pdfGenerate =(e)=>{
  var doc=new jsPDF('landscape','px','a4','false');
  doc.addImage(logo,'PNG',100,200,400,200);
  autoTable(doc, { html: '#leavetable' })
  doc.save('Leave_List.pdf')
}

const LeaveItemAdmmin = ({leave,updatestatusByID}) => {

  
    const [value,SetValue]=useState('');
    const [dataSource,SetdataSource]=useState(leave);
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
 

    // const onchange = (e) =>
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    const setStatus = async (id, e) => {
      try {
        console.log(e.target.value);
        console.log(id);
      
      updatestatusByID(id,e.target.value);
      
      } catch (error) {
        console.log(error)
      }
  
    }

   
   


    const leaves =  value.length > 0 ? tableFilter.map((item) => (
    
        <tr key={item._id}>
          <td>{item.empNo}</td>
          <td>{item.empName}</td>
          <td>{item.date}</td>
          <td>{item.starttimeoff}</td>
          <td>{item.Endtimeoff}</td>
          <td>{item.Message}</td>
          <td>{item.NumberofDays}</td>
          <td>{item.status}</td>
          <td>
            {' '}
            <button 
            name='status'
            value={"Declined"}
              className='btn btn-danger'
            onClick={(e) => setStatus(item._id,e)}
           >
              <i class='fas fa-window-close'></i>
            </button>
          
          </td>

          <td>
            {' '}
            <button name='status'
            value={"Approved"}
            className='btn btn-success'
            onClick={((e) => setStatus(item._id,e))}
            >
            <i class='fas fa-check'></i>
            </button>
          
          </td>
          
        </tr>
      )):  leave.map((item) => (
        
        <tr key={item._id}>
        <td>{item.empNo}</td>
        <td>{item.empName}</td>
     
        <td>{item.date}</td>
        <td>{item.starttimeoff}</td>
        <td>{item.Endtimeoff}</td>
        <td>{item.Message}</td>
        <td>{item.NumberofDays}</td>
        <td>{item.status}</td>
        <td>
      {' '}
      <button value={"Declined"}
      name='status'
      className='btn btn-danger'
      onClick={ (e)=>setStatus(item._id,e)}
      >
      
      <i class='fas fa-window-close'></i>
       </button>
       </td>
      
      
      <td>
      {' '}
      <button value={"Approved"}
       name='status'
      className='btn btn-success'
      
      onClick={(e) => setStatus(item._id,e)}
       >
      <i className='fas fa-check'></i>
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
      <button className='btn btn-success' onClick={pdfGenerate}><i className='fas fa-file-download'></i> PDF</button>
      <table className='table' id='leavetable'>
        <thead>
          <tr>
            <th>Employee No</th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Employee Name
            </th>
           
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Date
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Start Time
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              End Time
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Message
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Number of Days
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Status
            </th>
            
            
            
            
            
          </tr>
        </thead>
        <tbody>{leaves}</tbody>
      </table>
      
    </Fragment>
  );
};

LeaveItemAdmmin.propTypes = {
  leave: PropTypes.array.isRequired,

 updatestatusByID:PropTypes.func.isRequired
};

export default connect(null,{updatestatusByID})(LeaveItemAdmmin);