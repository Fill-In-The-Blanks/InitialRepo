import React, { Fragment, useState } from 'react';
import * as XLSX from 'xlsx';
import { addEmployees } from '../../actions/employee';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const InitialConfig = ({ addEmployees }) => {
  const [formData, setFormData] = useState([]);

  // Sam Lama's code - https://github.com/Rinlama/ReactTools/blob/readexcel/src/App.js
  // YouTube - https://www.youtube.com/watch?v=h33eakwu7oo
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: 'buffer' });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setFormData(d);
      addEmployees(d);
      /* console.log(d); */

      /* d.map((row) => {   Add one object a time. Might lag the server with the constant function calls
        console.log(row);
      }); */
    });
  };

  return (
    <Fragment>
      <h2>Inital Configuration</h2>
      Upload Instructor File <br></br>
      <input
        type='file'
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Employee No.</th>
            <th scope='col'>Employee Name</th>
            <th scope='col'>Employee Email</th>
            <th scope='col'>Phone</th>
            <th scope='col'>Specialization</th>
            <th scope='col'>Vacancy Status</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((d) => (
            <tr key={d.empNo}>
              <td>{d.empNo}</td>
              <td>{d.empName}</td>
              <td>{d.sliitEmail}</td>
              <td>{d.phone}</td>
              <td>{d.department}</td>
              <td>{d.vacancyStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

InitialConfig.propTypes = {
  addEmployees: PropTypes.func.isRequired,
};

export default connect(null, { addEmployees })(InitialConfig);
