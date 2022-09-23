import axios from 'axios';
import React, { useState, useEffect } from 'react';
import logo from '../../img/sllit logo.png';

import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';

function AllocatedTime() {
  const [timeTable, setTimeTable] = useState([]);
  useEffect(() => {
    axios
      .get('/api/timetable/getTimeTable')
      .then((body) => setTimeTable(body.data))
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (item) => {
    console.log(item);
    axios
      .post('/api/timetable/deleteSlots', item)
      .then((body) => console.log(body.data))
      .catch((err) => console.log(err));
    document.location.reload();
  };

  const pdfGenerate = (e) => {
    var doc = new jsPDF('landscape', 'px', 'a4', 'false');

    doc.addImage(logo, 'PNG', 100, 200, 400, 200);

    autoTable(doc, { html: '#allocatedSlots' });

    doc.save('Allocated_Slots.pdf');
  };

  return (
    <div>
      {timeTable && (
        <h2 className='d-flex justify-content-center m-1'>Allocated Slots</h2>
      )}
      {timeTable && (
        <table className='table' id='allocatedSlots'>
          <thead>
            <tr>
              <th>startTiming</th>
              <th>endTiming</th>
              <th>Day</th>
              <th>Batch</th>
              <th>Teacher Name</th>
              <th>Hours</th>
              <th>Subject</th>
            </tr>
          </thead>
          <tbody>
            {timeTable
              ? timeTable.map((item) => {
                  return (
                    <tr>
                      <td>{item.startTime}</td>
                      <td>{item.endTime}</td>
                      <td>{item.day}</td>
                      <td>{item.group}</td>
                      <td>{item.empName}</td>
                      <td>{item.hours}</td>
                      <td>{item.module}</td>
                      <td>
                        <button
                          className='btn btn-danger'
                          onClick={() => {
                            handleDelete(item);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : 'hello'}
          </tbody>
        </table>
      )}
      <button className='btn btn-success ' onClick={pdfGenerate}>
        PDF
      </button>
    </div>
  );
}

export default AllocatedTime;
