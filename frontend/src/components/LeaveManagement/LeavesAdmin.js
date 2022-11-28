import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../Pagination';
import { connect } from 'react-redux';
import { getLeaves } from '../../actions/leaves';
import LeaveItemAdmin from './LeaveItemAdmin';

const ListLeaves = ({
  getLeaves,
  leave: { leaves, loading },
  auth: { admin },
}) => {
  // holds the list of leaves from instructors
  const [dataSource, SetdataSource] = useState([]);

  // to handle switching between rendering only paginated data or whole data
  const [renderWhole, setDataRender] = useState(false);

  useEffect(() => {
    if (
      leaves.length === 0 ||
      JSON.stringify(dataSource) != JSON.stringify(leaves)
    ) {
      getLeaves();
      SetdataSource(leaves);
    }
  }, [getLeaves, leaves]);

  // holds pagination page number
  const [currentPage, setCurrentPage] = useState(1);
  // no. of records per page
  const [recordsPerPage] = useState(20);

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
      <div>
        {dataSource.length > 0 ? (
          renderWhole ? (
            <Fragment>
              <LeaveItemAdmin
                allLeaves={leaves}
                currentLeaves={leaves}
                state={renderWhole}
                setState={setDataRender}
              />
            </Fragment>
          ) : (
            <Fragment>
              <LeaveItemAdmin
                allLeaves={leaves}
                currentLeaves={currentRecords}
                state={renderWhole}
                setState={setDataRender}
              />
              <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </Fragment>
          )
        ) : (
          <p className='lead'>No Leaves Found</p>
        )}
      </div>

      <div></div>
    </Fragment>
  );
};

ListLeaves.propTypes = {
  getLeaves: PropTypes.func.isRequired,
  leave: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  leave: state.leave,
  auth: state.auth,
});

export default connect(mapStateToProps, { getLeaves })(ListLeaves);
