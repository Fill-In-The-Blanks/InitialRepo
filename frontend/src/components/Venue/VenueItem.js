import React, { Fragment,useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteVenue } from '../../actions/venues';
import jsPDF from 'jspdf';
import logo from '../../img/sllit logo.png'
import autoTable from 'jspdf-autotable';


const pdfGenerate =(e)=>{
  var doc=new jsPDF('landscape','px','a4','false');
  doc.addImage(logo,'PNG',100,200,400,200);
  autoTable(doc, { html: '#venuetable' })
  doc.save('Venue_List.pdf')
}
const VenueItem = ({venue , deleteVenue }) => {

  const [value,SetValue]=useState('');
  const [dataSource,SetdataSource]=useState(venue);
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

 

  const venues =  value.length > 0 ? tableFilter.map((ven) => (
    <tr key={ven._id}>
      <td>{ven.vName}</td>
      <td>{ven.vID}</td>
      <td>{ven.type}</td>
      <td>{ven.size}</td>
      <td>{ven.floor}</td>
      <td>{ven.faculty}</td>
      <td>
        {' '}
        <button
          className='btn btn-danger'
          onClick={() => deleteVenue(ven._id)}
        >
          <i className='fas fa-trash'></i>
        </button>
      </td>
      <td>
        <Link to={`/EditVenues/${ven._id}`}>
          <button className='btn btn-success'><i className='fas fa-edit'></i></button>
        </Link>
      </td>
    </tr>
  )):venue.map((ven) => (
    <tr key={ven._id}>
      <td>{ven.vName}</td>
      <td>{ven.vID}</td>
      <td>{ven.type}</td>
      <td>{ven.size}</td>
      <td>{ven.floor}</td>
      <td>{ven.faculty}</td>
      <td>
        {' '}
        <button
          className='btn btn-danger'
          onClick={() => deleteVenue(ven._id)}
        >
          <i className='fas fa-trash'></i>
        </button>
      </td>
      <td>
        <Link to={`/EditVenues/${ven._id}`}>
          <button className='btn btn-success'><i className='fas fa-edit'></i></button>
        </Link>
      </td>
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
        <button className='btn btn-success' onClick={pdfGenerate}><i className='fas fa-file-download'></i> PDF</button>
       <Link to={`/addVenues`}>
          <button className='btn btn-success'>+ Add new</button>
        </Link>

     

      <table className='table' id='venuetable'>
        <thead>
          <tr>
            <th>Venue Name</th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Venue ID
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Type
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Size
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Floor
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Faculty
            </th>
          </tr>
        </thead>
        <tbody>{venues}</tbody>
      </table>
    </Fragment>
  );
};

VenueItem.propTypes = {
  Venue: PropTypes.array.isRequired,
  deleteVenue: PropTypes.func.isRequired,
};

export default connect(null, { deleteVenue })(VenueItem);
