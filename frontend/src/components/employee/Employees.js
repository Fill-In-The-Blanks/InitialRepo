import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../Pagination';
import { connect } from 'react-redux';
import { getEmployees } from '../../actions/employee';
import EmployeeItem from './EmployeeItem';
import Spinner from '../layout/Spinner';

const Employees = ({ getEmployees, employee: { employees, loading } }) => {
  // holds the list of employees
  const [dataSource, SetdataSource] = useState([]);

  // to handle switching between rendering only paginated data or whole data
  const [renderWhole, setDataRender] = useState(false);

  useEffect(() => {
    if (
      employees.length === 0 ||
      JSON.stringify(dataSource) != JSON.stringify(employees)
    ) {
      getEmployees();
      SetdataSource(employees);
    }
  }, [getEmployees, employees]);

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
        <p className='lead'>Employee Management</p>

        {dataSource.length > 0 ? (
          renderWhole ? (
            <Fragment>
              <EmployeeItem
                currentEmployees={dataSource}
                allEmployees={dataSource}
                state={renderWhole}
                setState={setDataRender}
              />
            </Fragment>
          ) : (
            <Fragment>
              <EmployeeItem
                currentEmployees={currentRecords}
                allEmployees={dataSource}
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
          <h4>No employees found</h4>
        )}
      </section>
    </Fragment>
  );
};

Employees.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  employee: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  employee: state.employee,
  auth: state.auth,
});

export default connect(mapStateToProps, { getEmployees })(Employees);
