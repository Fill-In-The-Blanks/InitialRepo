import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteVenue } from '../../actions/venues';

const VenueItem = ({venue , deleteVenue }) => {
  const venues = venue.map((ven) => (
    <tr key={ven._id}>
      <td>{ven.vName}</td>
      <td>{ven.vID}</td>
      <td>{ven.type}</td>
      <td>{ven.size}</td>
      <td>{ven.floor}</td>
      <td>{ven.faculty}</td>
      <td>
        {' '}
        <button
          className='btn btn-danger'
          onClick={() => deleteVenue(ven._id)}
        >
          Delete{' '}
        </button>
      </td>
      <td>
        <Link to={`/EditVenues/${ven._id}`}>
          <button className='btn btn-success'>Edit</button>
        </Link>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      
      <table className='table'>
        <thead>
          <tr>
            <th>Venue Name</th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              Venue ID
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              Type
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              Size
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              Floor
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              Faculty
            </th>
          </tr>
        </thead>
        <tbody>{venues}</tbody>
      </table>
    </Fragment>
  );
};

VenueItem.propTypes = {
  Venue: PropTypes.array.isRequired,
  deleteVenue: PropTypes.func.isRequired,
};

export default connect(null, { deleteVenue })(VenueItem);
