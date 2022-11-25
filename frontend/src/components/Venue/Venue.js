import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../Pagination';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getVenues } from '../../actions/venues';
import VenueItem from './VenueItem';

const ListVenue = ({
  getVenues,
  venue: { venues, loading },
  auth: { admin },
}) => {
  // holds the list of venues
  const [dataSource, SetdataSource] = useState([]);

  useEffect(() => {
    if (
      venues.length === 0 ||
      JSON.stringify(dataSource) != JSON.stringify(venues)
    ) {
      getVenues();
      SetdataSource(venues);
    }
  }, [getVenues, venues]);

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
      <section className='container container-margin-top-override'>
        <p className='lead'>
          {/* <i className='fas fa-user'></i> */} Venue Management
        </p>
        {dataSource.length > 0 ? (
          <Fragment>
            <VenueItem allVenues={venues} currentVenues={currentRecords} />
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Fragment>
        ) : (
          <h4>No Venues found</h4>
        )}
      </section>
    </Fragment>
  );
};
ListVenue.propTypes = {
  getVenues: PropTypes.func.isRequired,
  venue: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  venue: state.venue,
  auth: state.auth,
});

export default connect(mapStateToProps, { getVenues })(ListVenue);
