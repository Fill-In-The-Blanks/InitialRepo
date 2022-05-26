import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteModule } from '../../actions/modules_auth';

const ModuleItem = ({ module, deleteModule }) => {
  const modules = module.map((mod) => (
    <tr key={mod._id}>
      <td>{mod.moduleName}</td>
      <td>{mod.ModuleID}</td>
      <td>{mod.specialization}</td>
      <td>{mod.year}</td>
      <td>{mod.semester}</td>
      <td>
        {' '}
        <button
          className='btn btn-danger'
          onClick={() => deleteModule(mod._id)}
        >
          Delete{' '}
        </button>
      </td>
      <td>
        <Link to={`/EditModules/${mod._id}`}>
          <button className='btn btn-success'>Edit</button>
        </Link>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <p className='lead'> Module Management</p>
      <table className='table'>
        <thead>
          <tr>
            <th>Module Name</th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              Module code
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              specialization
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              Year
            </th>
            <th className='hide-sm' style={{ textAlign: 'center' }}>
              semester
            </th>
          </tr>
        </thead>
        <tbody>{modules}</tbody>
      </table>
    </Fragment>
  );
};

ModuleItem.propTypes = {
  module: PropTypes.array.isRequired,
  deleteModule: PropTypes.func.isRequired,
};

export default connect(null, { deleteModule })(ModuleItem);
