import React, { Fragment } from 'react';
import  axios  from 'axios';
import PropTypes from 'prop-types';
import { connect, shallowEqual } from 'react-redux';
import { deleteSlot } from '../../actions/timetable';

const TimetableItem = ({ slots, deleteSlot }) => {


  const selectStaffRequirement = async (slot, e) => {
    try {
      console.log(e.target.value);
      console.log(slot);
      await axios.post('/api/timetable/slot', { slotID : slot, staffRequirement: e.target.value });
      
    } catch (error) {
      console.log(error)
    }

  }
  const slotsMapped = slots.map((slot, index) => (
    <tr key={index}>
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
  ));
  return (
    <Fragment>
      <table className='table'>
        <thead>
          <tr>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              No.
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              Time Slot
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              Day
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              Module
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              Venue
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              Group
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
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
