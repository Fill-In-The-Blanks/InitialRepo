import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getSlots } from '../../actions/timetable';
import TimetableItem from './TimetableItem';
import SlotsConfirmationDialog from '../dialogBox/SlotsConfirmationDialog';
import Pagination from '../Pagination';

const TimetableManagement = ({ getSlots, timetable: { slots } }) => {
  // holds the list of slots
  const [dataSource, SetdataSource] = useState([]);

  // to handle switching between rendering only paginated data or whole data
  const [renderWhole, setDataRender] = useState(false);

  const [buttonStatus, setButtonStatus] = useState({
    delete: false,
  });

  useEffect(() => {
    if (
      slots.length === 0 ||
      JSON.stringify(dataSource) !== JSON.stringify(slots)
    ) {
      getSlots();
      SetdataSource(slots);
    }
    buttonStatus.delete = false;
  }, [getSlots, slots]);

  // holds pagination page number
  const [currentPage, setCurrentPage] = useState(1);
  // no. of records per page
  const [recordsPerPage] = useState(100);

  // holds the last record in the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  // holds the first record in the current page
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // holds the records of the current page
  const currentRecords = dataSource.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  // calculate no. of pages needed to display all records
  const nPages = Math.ceil(dataSource.length / recordsPerPage);

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
            <button
              className='btn btn-danger'
              style={{ float: 'right' }}
              onClick={() => setButtonStatus({ delete: !buttonStatus.delete })}
            >
              <i className='fas fa-trash'></i>
              {''} Delete All Slots{' '}
            </button>
            {dataSource.length > 0 ? (
              renderWhole ? (
                <Fragment>
                  <TimetableItem
                    currentSlots={slots}
                    allSlots={slots}
                    state={renderWhole}
                    setState={setDataRender}
                  />
                </Fragment>
              ) : (
                <Fragment>
                  <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                  <TimetableItem
                    currentSlots={currentRecords}
                    allSlots={slots}
                    state={renderWhole}
                    setState={setDataRender}
                  />
                </Fragment>
              )
            ) : (
              <Spinner />
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
