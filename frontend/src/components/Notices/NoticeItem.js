import React, { Fragment,useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteNotice } from '../../actions/notices';
import EmployeeItem from '../employee/EmployeeItem';
import jsPDF from 'jspdf';
import logo from '../../img/sllit logo.png'
import autoTable from 'jspdf-autotable';


const pdfGenerate =(e)=>{
  var doc=new jsPDF('landscape','px','a4','false');
  doc.addImage(logo,'PNG',100,200,400,200);
  autoTable(doc, { html: '#noticetable' })
  doc.save('Notices_List.pdf')
}


const NoticeItem = ({notices, deleteNotice}) => {

  const [value,SetValue]=useState('');
  const [dataSource,SetdataSource]=useState(notices);
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




  const noticeMapped = value.length > 0 ? tableFilter.map((notice) => (
    <tr key={notice._id}>
      <td>{notice.noticeNO}</td>
      <td>{notice.heading}</td>
      <td>{notice.content}</td>
      <td>{notice.author}</td>
      <td>{notice.start}</td>
      <td>{notice.end}</td>
      <td>
        {' '}
        <button className='btn btn-danger' onClick={()=> deleteNotice(notice._id)}>
        <i className='fas fa-trash'></i>
          </button>
      </td>

    </tr>
  )):notices.map((notice) => (
    <tr key={notice._id}>
      <td>{notice.noticeNO}</td>
      <td>{notice.heading}</td>
      <td>{notice.content}</td>
      <td>{notice.author}</td>
      <td>{notice.start}</td>
      <td>{notice.end}</td>
      <td>
        {' '}
        <button className='btn btn-danger' onClick={()=> deleteNotice(notice._id)}>
        <i className='fas fa-trash'></i>
          </button>
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
       <Link to={`/AddNotice`}>
          <button className='btn btn-success'>+ Add new</button>
        </Link>

      <table className='table' id='noticetable'>
        <thead>
          <tr>
            <th className='hide-sm' style={{textAlign: 'left'}}>
              Notice Number
            </th>
            <th className='hide-sm' style={{textAlign: 'left'}}>
              Notice Heading
            </th>
            <th className='hide-sm' style={{textAlign: 'left'}}>
              Notice content
            </th>
            <th className='hide-sm' style={{textAlign: 'left'}}>
              Notice author
            </th>
            <th className='hide-sm' style={{textAlign:'left'}}>
              Start Date
            </th>
            <th className='hide-sm' style={{textAlign:'left'}}>
              End Date
            </th>
          </tr>
        </thead>
        <tbody>{noticeMapped}</tbody>
      </table>
    </Fragment>
    
  )
}




NoticeItem.propTypes = {
    notices: PropTypes.array.isRequired,
    deleteNotice: PropTypes.func.isRequired,
  };

  export default connect(null,{deleteNotice})(NoticeItem);
  