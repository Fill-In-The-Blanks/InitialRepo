import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../Pagination';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getModules } from '../../actions/modules_auth';
import ModuleItem from './ModuleItem';

const List = ({
  getModules,
  module: { modules, loading },
  auth: { admin },
}) => {
  // holds the list of modules
  const [dataSource, SetdataSource] = useState([]);

  useEffect(() => {
    if (
      modules.length == 0 ||
      JSON.stringify(dataSource) != JSON.stringify(modules)
    ) {
      getModules();
      SetdataSource(modules);
    }
  }, [getModules, modules]);

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
          <Fragment>
            <ModuleItem currentModules={currentRecords} allModules={modules} />
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Fragment>
        ) : (
          <h4>No modules found</h4>
        )}
      </div>

      <div></div>
    </Fragment>
  );
};

List.propTypes = {
  getModules: PropTypes.func.isRequired,
  module: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  module: state.module,
  auth: state.auth,
});

export default connect(mapStateToProps, { getModules })(List);
