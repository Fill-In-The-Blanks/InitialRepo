import React, { Fragment,useState } from 'react';
import  axios  from 'axios';
import PropTypes from 'prop-types';
import { connect, shallowEqual } from 'react-redux';
import { deleteSlot } from '../../actions/timetable';
import jsPDF from 'jspdf';
import logo from '../../img/sllit logo.png'
import autoTable from 'jspdf-autotable';
import { Link } from 'react-router-dom';

const pdfGenerate =(e)=>{
  var doc=new jsPDF('landscape','px','a4','false');
  doc.addImage(logo,'PNG',100,200,400,200);
  autoTable(doc, { html: '#timelist' })
  doc.save('TimeTable_List.pdf')
}
const TimetableItem = ({ slots, deleteSlot }) => {
  const [value,SetValue]=useState('');
  const [dataSource,SetdataSource]=useState(slots);
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



  const slotsMapped = value.length > 0 ? tableFilter.map((slot, index) => (
    <tr key={slot._id}>
      <td>{index + 1}</td>
      <td>
        {slot.startTime} - {slot.endTime}
      </td>
      <td>{slot.dayOfTheWeek}</td>
      <td>{slot.module}</td>
      <td>{slot.venue}</td>
      <td>{slot.group}</td>
      <td>{slot.staffRequirement}</td>
      <td>
        {' '}
        <button className='btn btn-danger' onClick={() => deleteSlot(slot._id)}>
        <i className='fas fa-trash'></i>
        </button>
      </td>
    </tr>
  )):slots.map((slot, index) => (
    <tr key={slot._id}>
      <td>{index + 1}</td>
      <td>
        {slot.startTime} - {slot.endTime}
      </td>
      <td>{slot.dayOfTheWeek}</td>
      <td>{slot.module}</td>
      <td>{slot.venue}</td>
      <td>{slot.group}</td>
      <td>
        {/*Adhil - add ur part*/}
      </td>
      <td>
        {' '}
        <button className='btn btn-danger' onClick={() => deleteSlot(slot._id)}>
          Delete{' '}
        </button>
      </td>
    </tr >
  ))
  return (
    <Fragment>
        <div className='search'>         
    
    <input type='text' 
    placeholder='Search'
    
    value={value}
    onChange={filterData}/>
  </div>
  <Link to={`/allocateSlot`}>
              <button className='btn btn-primary'> <i className='fa-solid fa-list-check'></i>Allocate Sots</button>
            </Link>
       <button className='btn btn-success' onClick={pdfGenerate}><i className='fas fa-file-download'></i> PDF</button>
      <table className='table' id='timelist'>
        <thead>
          <tr>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              No.
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' ,paddingRight:'90px'}}>
              Time Slot
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Day
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Module
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Venue
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Group
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Staff Requirement
            </th>
          </tr>
        </thead>
        <tbody>{slotsMapped}</tbody>
      </table>
    </Fragment>
  );
};

TimetableItem.propTypes = {
  slots: PropTypes.array.isRequired,
  deleteSlot: PropTypes.func.isRequired,
};

export default connect(null, { deleteSlot })(TimetableItem);
