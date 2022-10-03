import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLeave } from '../../actions/leaves';
import LeaveItem from './LeaveItem';

const ListLeave = ({
    getLeave,
    leave: { leaves, loading },
    auth: { instructor },
  }) => {
    const {id }= useParams();
    useEffect(() => {
      getLeave(id);
    }, []);

    return (
      <Fragment>
        <div>
          { leaves.length > 0 ? (
            <LeaveItem leave={leaves}/>
          ):(
            <h4>No Leaves Found</h4>
          )}
          <Link to={`/SendRequest/${id}`}>
            <button className='btn btn-success'>+</button>
          </Link>
        </div>
  
        <div>
          
        </div>
      </Fragment>
  
      
    );
  };
  
  ListLeave.propTypes = {
    getLeave: PropTypes.func.isRequired,
    leave: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    leave: state.leave,
    auth: state.auth,
  });

  export default connect(mapStateToProps, { getLeave })(ListLeave);