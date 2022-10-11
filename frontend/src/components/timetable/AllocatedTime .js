import axios from 'axios';
import React, { useState, useEffect } from 'react';
import logo from '../../img/sllit logo.png';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';


function AllocatedTime() {


  const [emphour, setEmphours] = useState([])
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

  /* Adhil - add ur excel generation part here */

  /* Nuzha - add ur pdf generation part here*/

    useEffect(() => {
      timeTable.forEach((item) => {
        let hours = 0;
        hours = item.hours
        let index = emphour.findIndex((item2) => item2.empNo === item.empNo)
        if (index === -1) {
          emphour.push({ empNo: item.empNo, hours: item.hours})
        }
        else {
          let new_hours = emphour[index].hours + hours
          emphour[index] = {
            empNo: item.empNo,
            hours: new_hours
          }
        }
      })
    }, [timeTable,emphour])
    

    return (
      <div>
        {timeTable && (
          <h2 className='d-flex justify-content-center m-1'>Allocated Slots</h2>
        )}
        {timeTable && (
          <table className='table' id='allocatedSlots'>
            <thead>
              <tr>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Day</th>
                <th>Batch</th>
                <th>Instructor Name</th>
                <th>Hours</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              {timeTable
                ? timeTable.map((item) => {
                  return (
                    <tr >
                      <td>{item.startTime}</td>
                      <td>{item.endTime}</td>
                      <td>{item.day}</td>
                      <td>{item.group}</td>
                      <td>{item.empName}</td>
                      <td>{/* Nuzha - add ur part here*/}</td>
                      <td>{item.module}</td>
                      <td>
                        <button
                          className='btn btn-danger'
                          onClick={() => {
                            handleDelete(item)
                          }}
                        >
                          <i className='fas fa-trash'></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
                : 'hello'}
            </tbody>
          </table>
        )}
        {/* Nuzha - add pdf generation button here */}
        {/* Adhil - add excel generation button here */}
      </div>
    );

  }


export default AllocatedTime;
