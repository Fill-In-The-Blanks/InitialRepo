import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSlots } from '../../actions/timetable';
import TimetableItem from './TimetableItem';

const TimetableManagement = ({ getSlots, timetable: { slots } }) => {
  useEffect(() => {
    getSlots();
  }, []);
  return (
    <Fragment>
      <section className='container container-margin-top-override'>
        <p className='lead'>Timetable Management</p>

        <Link to={`/`}>
          <button className='btn btn-primary' style={{ marginBottom: '5px' }}>
            Add Slot
          </button>
        </Link>
        <Link to={`/timetableManagement`}>
          <button className='btn btn-primary'>List Slots</button>
        </Link>

        {slots.length > 0 ? (
          <TimetableItem slots={slots} />
        ) : (
          <h4>No slots found</h4>
        )}
      </section>
    </Fragment>
  );
};

TimetableManagement.propTypes = {
  getSlots: PropTypes.func.isRequired,
  timetable: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  timetable: state.timetable,
  auth: state.auth,
});

export default connect(mapStateToProps, { getSlots })(TimetableManagement);
