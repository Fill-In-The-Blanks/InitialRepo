import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteNotice } from '../../actions/notices';
import EmployeeItem from '../employee/EmployeeItem';



const NoticeItem = ({notices, deleteNotice}) => {
  const noticeMapped = notices.map((notice) => (
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
          Delete{' '}
          </button>
      </td>

    </tr>
  ));

  return (
    <Fragment>
      <table className='table'>
        <thead>
          <tr>
            <th className='hide-sm' style={{textAlign: 'center'}}>
              Notice Number
            </th>
            <th className='hide-sm' style={{textAlign: 'center'}}>
              Notice Heading
            </th>
            <th className='hide-sm' style={{textAlign: 'center'}}>
              Notice content
            </th>
            <th className='hide-sm' style={{textAlign: 'center'}}>
              Notice author
            </th>
            <th className='hide-sm' style={{textAlign:'center'}}>
              Start Date
            </th>
            <th className='hide-sm' style={{textAlign:'center'}}>
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
  