import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteEmployee } from '../../actions/employee';
import jsPDF from 'jspdf';
import logo from '../../img/sllit logo.png';
import autoTable from 'jspdf-autotable';
import MyChart from '../Mychart';
import Swal from 'sweetalert2';

const pdfGenerate = (e) => {
  var doc = new jsPDF('landscape', 'px', 'a4', 'false');

  autoTable(doc, {
    html: '#employee-table',
    didDrawPage: function (data) {
      // Header
      doc.setFontSize(20);
      doc.setTextColor(40);
      doc.text('       Employee Information  ', data.settings.margin.right, 22);
      doc.addImage(logo, 'PNG', data.settings.margin.right, 8, 20, 20);

      // Footer
      var str = 'Page ' + doc.internal.getNumberOfPages();

      doc.setFontSize(10);

      // jsPDF 1.4+ uses getWidth, <1.4 uses .width
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
      doc.text(str, data.settings.margin.left, pageHeight - 10);
    },
  });

  doc.save('Employee_List.pdf');
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'File Downloaded',
    showConfirmButton: false,
    timer: 1500,
  });
};

const EmployeeItem = ({
  currentEmployees,
  allEmployees,
  state,
  setState,
  deleteEmployee,
  auth: { admin },
}) => {
  // currentEmployees -> the data of the current page
  // allEmployees -> used for search bar filtering purposes

  const [value, SetValue] = useState('');

  // holds the data for filtering by search
  const [dataSource, SetdataSource] = useState(allEmployees);

  // if new employee is added or updated then run this to update this component as well
  useEffect(() => {
    SetdataSource(allEmployees);
  }, [dataSource, allEmployees]);

  // holds the filtered data from dataSource
  const [tableFilter, SetTableFilter] = useState([]);

  const filterData = (e) => {
    if (e.target.value !== '') {
      SetValue(e.target.value);
      const filter = dataSource.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      SetTableFilter([...filter]);
    } else {
      SetValue(e.target.value);
      SetdataSource([...dataSource]);
    }
  };

  const Delete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        var employeeid = id;
        deleteEmployee(employeeid);
        Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
      }
    });
  };
  const handleGraph = (index) => {
    let chart = document.getElementById(`chart-${index}`);
    if (chart.style.display === '') {
      chart.style.display = 'none';
    } else {
      chart.style.display = '';
    }
  };

  // used a custom function to change renderWhole state because kept facing infinite re-render loop when I just called setDataRender(!renderWhole) in button onClick
  const changeRender = () => {
    setState(!state);
  };

  const employeesMapped =
    value.length > 0
      ? tableFilter.map((employee, index) => (
          <>
            <tr key={employee._id}>
              <td>{employee.empNo}</td>
              <td>{employee.empName}</td>
              <td>{employee.sliitEmail}</td>
              <td>{employee.phone}</td>
              <td>{employee.department}</td>
              <td>{employee.vacancyStatus}</td>
              {(admin?.department === 'admin' ||
                admin?.department === employee.department) && (
                <td>
                  <button
                    className='btn btn-danger'
                    onClick={() => Delete(employee._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </button>
                </td>
              )}
              {(admin?.department === 'admin' ||
                admin?.department === employee.department) && (
                <td>
                  <Link
                    to={`/updateEmployee/${employee._id}`}
                    className='btn btn-success'
                  >
                    <i className='fas fa-edit'></i>
                  </Link>
                </td>
              )}
              <td>
                <Link to={`/ListAdminTime/${employee.empNo}`}>
                  <button className='btn btn-success'>
                    <i className='fas fa-calendar'></i>
                  </button>
                </Link>
              </td>
              <td>
                <button
                  className='btn btn-primary'
                  onClick={() => {
                    handleGraph(index);
                  }}
                >
                  Hours
                </button>
              </td>
            </tr>
            <tr>
              <td colSpan={8} id={`chart-${index}`} style={{ display: 'none' }}>
                <MyChart empNo={employee.empNo} />
              </td>
            </tr>
          </>
        ))
      : currentEmployees.map((employee, index) => (
          <>
            <tr key={employee._id}>
              <td>{employee.empNo}</td>
              <td>{employee.empName}</td>
              <td>{employee.sliitEmail}</td>
              <td>{employee.phone}</td>
              <td>{employee.department}</td>
              <td>{employee.vacancyStatus}</td>
              {(admin?.department === 'admin' ||
                admin?.department === employee.department) && (
                <td>
                  <button
                    className='btn btn-danger'
                    onClick={() => Delete(employee._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </button>
                </td>
              )}
              {(admin?.department === 'admin' ||
                admin?.department === employee.department) && (
                <td>
                  <Link
                    to={`/updateEmployee/${employee._id}`}
                    className='btn btn-success'
                  >
                    <i className='fas fa-edit'></i>
                  </Link>
                </td>
              )}
              <td>
                <Link to={`/ListAdminTime/${employee.empNo}`}>
                  <button className='btn btn-success'>
                    <i className='fas fa-calendar'></i>
                  </button>
                </Link>
              </td>
              <td>
                <button
                  className='btn btn-primary'
                  onClick={() => {
                    handleGraph(index);
                  }}
                >
                  Hours
                </button>
              </td>
            </tr>
            <tr>
              <td colSpan={8} id={`chart-${index}`} style={{ display: 'none' }}>
                <MyChart empNo={employee.empNo} />
              </td>
            </tr>
          </>
        ));
  return (
    <Fragment>
      <div className='search'>
        <input
          type='text'
          placeholder='Search'
          value={value}
          onChange={filterData}
        />
      </div>
      <Link to={`/employeeManagement`}>
        <button className='btn btn-success' style={{ marginBottom: '5px' }}>
          + Add New
        </button>
      </Link>

      <button className='btn btn-success' onClick={pdfGenerate}>
        <i className='fas fa-file-download'></i> PDF
      </button>

      <button className='btn btn-success' onClick={changeRender}>
        <i className='fas fa-file-download'></i>{' '}
        {state ? 'View Paginated Data' : 'View All Data'}
      </button>

      <table className='table' id='employee-table'>
        <thead>
          <tr>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Employee Number
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Name
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              SLIIT Email
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Phone Number
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Department
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Vacancy Status
            </th>
          </tr>
        </thead>
        <tbody>{employeesMapped}</tbody>
      </table>
    </Fragment>
  );
};

EmployeeItem.propTypes = {
  currentEmployees: PropTypes.array.isRequired,
  allEmployees: PropTypes.array.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteEmployee })(EmployeeItem);
