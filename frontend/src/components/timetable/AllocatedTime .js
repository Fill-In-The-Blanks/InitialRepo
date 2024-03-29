import axios from 'axios';
import React, { useState, useEffect } from 'react';
import logo from '../../img/sllit logo.png';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import Pagination from '../Pagination';

function AllocatedTime() {
  // holds the total hours allocated to each instructor
  const [emphour, setEmphours] = useState([]);

  // holds all the allocation records
  const [timeTable, setTimeTable] = useState([]);

  // to handle switching between rendering only paginated data or whole data
  const [renderWhole, setDataRender] = useState(false);

  useEffect(() => {
    axios
      .get('/api/timetable/getTimeTable')
      .then((body) => setTimeTable(body.data))
      .catch((err) => console.log(err));
  }, []);

  // holds pagination page number
  const [currentPage, setCurrentPage] = useState(1);
  // no. of records per page
  const [recordsPerPage] = useState(20);

  // holds the last record in the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  // holds the first record in the current page
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // holds the records of the current page
  const currentRecords = timeTable.slice(indexOfFirstRecord, indexOfLastRecord);
  // calculate no. of pages needed to display all records
  const nPages = Math.ceil(timeTable.length / recordsPerPage);

  // displays a sweet alert for deletion
  const handleDelete = (item) => {
    console.log(item);
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
        axios
          .post('/api/timetable/deleteSlots', item)
          .then((body) => console.log(body.data))
          .catch((err) => console.log(err));
        document.location.reload();
        Swal.fire('Deleted!', 'Allocation has been deleted.', 'success');
      }
    });
  };

  // download the allocated session table into excel
  const excelGenerate = async () => {
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(timeTable);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, 'Allocated_Slots' + fileExtension);
  };

  // download the allocation session tabe into PDF
  const pdfGenerate = (e) => {
    var doc = new jsPDF('landscape', 'px', 'a4', 'false');

    autoTable(doc, {
      html: '#allocatedSlots',
      didDrawPage: function (data) {
        // Header
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.text('       Allocation List  ', data.settings.margin.right, 22);
        doc.addImage(logo, 'PNG', data.settings.margin.right, 8, 20, 20);

        // Footer
        var str = 'Page ' + doc.internal.getNumberOfPages();

        doc.setFontSize(10);

        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10);
      },
    });

    doc.save('Allocated_List.pdf');
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'File Downloaded',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  useEffect(() => {
    timeTable.forEach((item) => {
      let hours = 0;
      hours = item.hours;
      let index = emphour.findIndex((item2) => item2.empNo === item.empNo);
      if (index === -1) {
        emphour.push({ empNo: item.empNo, hours: item.hours });
      } else {
        let new_hours = emphour[index].hours + hours;
        emphour[index] = {
          empNo: item.empNo,
          hours: new_hours,
        };
      }
    });
  }, [timeTable, emphour]);

  // used a custom function to change renderWhole state because kept facing infinite re-render loop when I just called setDataRender(!renderWhole) in button onClick
  const changeRender = () => {
    setDataRender(!renderWhole);
  };

  return (
    <div>
      {timeTable && (
        <h2 className='d-flex justify-content-center m-1'>Allocated Slots</h2>
      )}
      <p style={{ color: 'red' }}>
        If 'Total Instructor Hours' column isn't displaying data then click on
        the 'View All/Paginated Data' button please
      </p>
      {timeTable && (
        <table className='table' id='allocatedSlots'>
          <thead>
            <tr>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Day</th>
              <th>Batch</th>
              <th>Instructor Name</th>
              <th>Total Instructor Hours</th>
              <th>Subject</th>
              <th>Venue</th>
            </tr>
          </thead>
          <tbody>
            {/* If timetable is received then check if we have to render whole data. If we have timetable but don't have to display whole data, then data will be displayed in a paginated way. If we don't have timetable then 'No timetable data' will be displayed */}
            {timeTable
              ? renderWhole
                ? timeTable.map((item) => {
                    return (
                      <tr>
                        <td>{item.startTime}</td>
                        <td>{item.endTime}</td>
                        <td>{item.day}</td>
                        <td>{item.batch}</td>
                        <td>{item.empName}</td>
                        <td>
                          {emphour.map((item3) => {
                            if (item.empNo === item3.empNo) {
                              return <p>{item3.hours}</p>;
                            }
                          })}
                        </td>
                        <td>{item.module}</td>
                        <td>{item.venue}</td>
                        <td>
                          <button
                            className='btn btn-danger'
                            onClick={() => {
                              handleDelete(item);
                            }}
                          >
                            <i className='fas fa-trash'></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : currentRecords.map((item) => {
                    return (
                      <tr>
                        <td>{item.startTime}</td>
                        <td>{item.endTime}</td>
                        <td>{item.day}</td>
                        <td>{item.batch}</td>
                        <td>{item.empName}</td>
                        <td>
                          {emphour.map((item3) => {
                            if (item.empNo === item3.empNo) {
                              return <p>{item3.hours}</p>;
                            }
                          })}
                        </td>
                        <td>{item.module}</td>
                        <td>{item.venue}</td>
                        <td>
                          <button
                            className='btn btn-danger'
                            onClick={() => {
                              handleDelete(item);
                            }}
                          >
                            <i className='fas fa-trash'></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })
              : 'No timetable data'}
          </tbody>
        </table>
      )}

      {!renderWhole && (
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

      <button className='btn btn-success ' onClick={pdfGenerate}>
        <i className='fas fa-file-download'></i>PDF
      </button>
      <button className='btn btn-success ' onClick={excelGenerate}>
        Excel
      </button>
      <button className='btn btn-success' onClick={changeRender}>
        <i className='fas fa-file-download'></i>{' '}
        {renderWhole ? 'View Paginated Data' : 'View All Data'}
      </button>
    </div>
  );
}

export default AllocatedTime;
