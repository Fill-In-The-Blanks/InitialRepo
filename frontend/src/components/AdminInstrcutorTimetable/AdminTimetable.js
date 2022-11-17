import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getallocatedTimetable } from '../../actions/instructor';
import { getEmployeeByID } from '../../actions/employee';
import AdminInstructorItem from './AdminTimetableitem';
import Spinner from '../layout/Spinner';

const initialState={
    empno:'' }
    var empno;
const AdminListAllocTime = ({
    getallocatedTimetable,
    getEmployeeByID,
    timetable1: {timetables},
    
    auth: { admin },
  }) => {
   
    const {id}= useParams();
    useEffect(() => {
        
            getallocatedTimetable(id);
        }
      
    , []);
    return  (
    
      <Fragment>
        <div>
        
         <p className='lead'>My Personal Time Table</p>
          { timetables.length > 0 ? (
        
            <AdminInstructorItem timetable1={timetables}/>
          ):(

            <p className='lead'>No Allocated Module Found</p>
          )}
       
        </div>
  
        <div>
          
        </div>
      </Fragment>
  
      
    );
  };
  
  AdminListAllocTime.propTypes = {
    getallocatedTimetable: PropTypes.func.isRequired,
    timetable1: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
   
    employees:PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    timetable1: state.timetable1,
    auth: state.auth,
  
   
  });

  export default connect(mapStateToProps, {getallocatedTimetable})(AdminListAllocTime);