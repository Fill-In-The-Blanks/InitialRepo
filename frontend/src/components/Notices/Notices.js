import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../Pagination';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getNotices } from '../../actions/notices';
import NoticeItem from './NoticeItem';

const Notices = ({ getNotices, notice: { notices, loading } }) => {
  // holds the list of notices
  const [dataSource, SetdataSource] = useState([]);

  useEffect(() => {
    if (
      notices.length === 0 ||
      JSON.stringify(dataSource) != JSON.stringify(notices)
    ) {
      getNotices();
      SetdataSource(notices);
    }
  }, [getNotices, notices]);

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

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className='container container-margin-top-override'>
        <p className='lead'>Notice Management</p>

        {dataSource.length > 0 ? (
          <Fragment>
            <NoticeItem allNotices={notices} currentNotices={currentRecords} />
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Fragment>
        ) : (
          <h4>No notices found</h4>
        )}
      </section>
    </Fragment>
  );
};
Notices.propTypes = {
  getNotices: PropTypes.func.isRequired,
  notice: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  notice: state.notice,
  auth: state.auth,
});

export default connect(mapStateToProps, { getNotices })(Notices);
