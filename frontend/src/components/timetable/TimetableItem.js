import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect, shallowEqual } from 'react-redux';
import { deleteSlot } from '../../actions/timetable';

const TimetableItem = ({ slots, deleteSlot }) => {
  const slotsMapped = slots.map((slot) => (
    <tr key={slot._id}>
      <td>
        {slot.startTime} - {slot.endTime}
      </td>
      <td>{slot.dayOfTheWeek}</td>
      <td>{slot.module}</td>
      <td>{slot.venue}</td>
      <td>{slot.group}</td>
      <td>{slot.sessionType}</td>
      <td>{slot.staffRequirement}</td>
      <td>
        {' '}
        <button className='btn btn-danger' onClick={() => deleteSlot(slot._id)}>
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
              Session Type
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
