import React, { Fragment,useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import logo from '../../img/sllit logo.png'
import autoTable from 'jspdf-autotable';


const pdfGenerate =(e)=>{
  var doc=new jsPDF('landscape','px','a4','false');
  doc.addImage(logo,'PNG',100,200,400,200);
  autoTable(doc, { html: '#mytimeTable' })
  doc.save('myTimetable.pdf')
}
const InstructorItem = ({timetable1}) => {

  const navigate = useNavigate();
    const [value,SetValue]=useState('');
    const [dataSource,SetdataSource]=useState(timetable1);
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



    const timetables =  value.length > 0 ? tableFilter.map((item) => (
      
        <tr key={item._id}>
        
          <td>{item.day}</td>
          <td>{item.startTime}</td>
          <td>{item.endTime}</td>
          <td>{item.venue}</td>
          {/* <td>{item.empName}</td>
          <td>{item.empNo}</td> */}
          <td>{item.hours}</td>
          
          
          
        </tr>
      )):  timetable1.map((item) => (
        
        
        <tr key={item._id}>
          
          <td>{item.day}</td>
          <td>{item.startTime}</td>
          <td>{item.endTime}</td>
          <td>{item.venue}</td>
          {/* <td>{item.empName}</td>
          <td>{item.empNo}</td> */}
          <td>{item.hours}</td>
          
          
          
        </tr>
      ))
      return (
    
        <Fragment>
         
         <div className='search'>         
    
    <input type='text' 
    placeholder='Search'
    
    value={value}
    onChange={filterData}/>
  </div>
                
                 
         

      <table className='table' id='mytimeTable'>
        <thead>
          <tr>
            <th>Day</th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Start Time
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
             End Time
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Venue
            </th>
            {/* <th className='hide-sm' style={{ textAlign: 'left' }}>
              Instructor
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Instructor ID
            </th> */}
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Hours
            </th>
           
            
            
            
            
            
          </tr>
        </thead>
        <tbody>{timetables}</tbody>
      </table>
      <button className='btn btn-success' onClick={pdfGenerate}><i className='fas fa-file-download'></i> PDF</button> 
      
    </Fragment>
  );
};

InstructorItem.propTypes = {
  timetable1: PropTypes.array.isRequired,
 
 
};

export default connect(null)(InstructorItem);