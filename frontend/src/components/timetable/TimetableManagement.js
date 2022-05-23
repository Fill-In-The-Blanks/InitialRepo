import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSlots } from '../../actions/timetable';
import TimetableItem from './TimetableItem';
import SlotsConfirmationDialog from '../dialogBox/SlotsConfirmationDialog';

const TimetableManagement = ({ getSlots, timetable: { slots } }) => {
  const [buttonStatus, setButtonStatus] = useState({
    delete: false,
  });

  useEffect(() => {
    getSlots();
    buttonStatus.delete = false;
  }, []);

  return (
    <Fragment>
      <section className='container container-margin-top-override'>
        <p className='lead'>Timetable Management</p>

        {buttonStatus.delete ? (
          <Fragment>
            <SlotsConfirmationDialog
              status={buttonStatus}
              setStatus={setButtonStatus}
              deleteP={buttonStatus.delete}
            />
          </Fragment>
        ) : (
          <Fragment>
            <Link to={`/`}>
              <button
                className='btn btn-primary'
                style={{ marginBottom: '5px' }}
              >
                Add Slot
              </button>
            </Link>
            <Link to={`/timetableManagement`}>
              <button className='btn btn-primary'>List Slots</button>
            </Link>
            <button
              className='btn btn-danger'
              style={{ float: 'right' }}
              onClick={() => setButtonStatus({ delete: !buttonStatus.delete })}
            >
              Delete All Slots{' '}
            </button>
            {slots.length > 0 ? (
              <TimetableItem slots={slots} />
            ) : (
              <h4>No slots found</h4>
            )}
          </Fragment>
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
