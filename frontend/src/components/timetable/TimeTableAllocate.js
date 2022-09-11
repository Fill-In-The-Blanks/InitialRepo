import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
/* import 'bootstrap/dist/css/bootstrap.min.css'; */
import { connect } from 'react-redux';
import { getEmployees } from '../../actions/employee';
import { Link } from 'react-router-dom';
import { getSlots, deleteSlots } from '../../actions/timetable';
import TimetableItem from './TimetableItem';
import AllocatedTime from './AllocatedTime ';
import axios from 'axios';

const TimeTableAllocate = ({
  getSlots,
  deleteSlots,
  timetable: { slots },
  getEmployees,
  employee: { employees },
}) => {
  const [module, setModule] = useState('');
  const [modules, setModules] = useState([]);
  const [timetable, setTimeTable] = useState([]);
  useEffect(() => {
    getSlots();
    getEmployees();
  }, []);

  //submit the generated slots to the db
  const SubmitData = () => {
    axios
      .post('/api/timetable/createTimeTable', { timetable: timetable })
      .then(document.location.reload())
      .catch((err) => console.log(err));
  };

  const convertToTime = (item) => {
    return (
      parseInt(item) + ':' + parseInt((item % 1).toFixed(2).substring(2)) * 0.6
    );
  };
  //function to convert time to no
  //for comparing
  const convertToNo = (item) => {
    return Number(item.split(':')[0]) + Number(item.split(':')[1] / 60);
  };

  //main function for the logic
  const handleEvent = (item, item2) => {
    const heading = document.getElementById(item._id);
    const name = document.getElementById(item2.empNo);
    const box = document.getElementById(
      item.startTime + '-' + item2.empNo + item._id
    );
    //helping functions
    //for enabling and disabling the checkboxes
    const disable = (item3) => {
      const box2 = document.getElementById(
        item3.startTime + '-' + item2.empNo + item3._id
      );
      if (box2.disabled === true) {
        box2.disabled = true;
      } else {
        box2.disabled = true;
      }
    };
    const enable = (item3) => {
      const box2 = document.getElementById(
        item3.startTime + '-' + item2.empNo + item3._id
      );
      if (box2.disabled === true) {
        box2.disabled = false;
      } else {
        box2.disabled = true;
      }
    };
    //conditions

    //when the box is checked
    if (box.checked) {
      //saving the values of the selected box
      setTimeTable([
        ...timetable,
        {
          module: module,
          startTime: item.startTime,
          endTime: item.endTime,
          empName: item2.empName,
          empNo: item2.empNo,
          hours: convertToNo(item.endTime) - convertToNo(item.startTime),
          _id: item._id,
          dayOfTheWeek: item.dayOfTheWeek,
          sessionType: item.sessionType,
          venue: item.venue,
        },
      ]);
      if (heading.style.background === 'orange') {
        name.style.background = 'orange';
      } else {
        name.style.background = 'orange';
        heading.style.background = 'orange';
      }

      //cheching if the slots clash or not
      slots.forEach((item3) => {
        if (
          module === item3.module &&
          item.dayOfTheWeek === item3.dayOfTheWeek &&
          item3.assigned === false
        ) {
          if (
            convertToNo(item3.startTime) < convertToNo(item.startTime) &&
            convertToNo(item3.endTime) > convertToNo(item.startTime)
          ) {
            disable(item3);
          } else if (
            convertToNo(item3.startTime) > convertToNo(item.startTime) &&
            convertToNo(item3.startTime) < convertToNo(item.endTime)
          ) {
            disable(item3);
          } else if (
            convertToNo(item3.startTime) === convertToNo(item.startTime) &&
            !document.getElementById(
              item3.startTime + '-' + item2.empNo + item3._id
            ).checked
          ) {
            disable(item3);
          } else {
            //if the slots don' clash
          }
        }
      });

      //if the required faculty members are achieved
      //blocking the other options

      if (
        timetable.filter(
          (timetable) =>
            timetable.startTime === item.startTime && timetable._id === item._id
        ).length ===
        slots.find(
          (timeSlot) =>
            timeSlot.startTime === item.startTime && timeSlot._id === item._id
        ).staffRequirement -
          1
      ) {
        heading.style.background = 'yellow';
        name.style.background = 'yellow';
        employees.forEach((item4) => {
          if (
            !document.getElementById(
              item.startTime + '-' + item4.empNo + item._id
            ).checked
          ) {
            document.getElementById(
              item.startTime + '-' + item4.empNo + item._id
            ).disabled = true;
          } else {
            document.getElementById(item4.empNo).style.background = 'yellow';
          }
        });
      }
    }

    //if the box is unchecked
    else {
      //removing the value of the unchecked box
      const index = timetable.findIndex(
        (t) =>
          convertToNo(t.startTime) === convertToNo(item.startTime) &&
          t.empNo === item2.empNo
      );
      setTimeTable([
        ...timetable.slice(0, index),
        ...timetable.slice(index + 1, timetable.length),
      ]);

      name.style.background = 'white';
      heading.style.background = '#5cdc3c';

      //enabling the other options
      //when the box is unchecked
      employees.forEach((teacher) => {
        if (
          document.getElementById(
            item.startTime + '-' + teacher.empNo + item._id
          ).checked &&
          teacher.empNo !== item2.empNo
        ) {
          heading.style.background = 'orange';
          document.getElementById(teacher.empNo).style.background = 'orange';
        }
      });

      slots.forEach((item3) => {
        if (
          module === item3.module &&
          item.dayOfTheWeek === item3.dayOfTheWeek &&
          item3.assigned === false
        ) {
          if (
            convertToNo(item3.startTime) < convertToNo(item.startTime) &&
            convertToNo(item3.endTime) > convertToNo(item.startTime)
          ) {
            enable(item3);
          } else if (
            convertToNo(item3.startTime) > convertToNo(item.startTime) &&
            convertToNo(item3.startTime) < convertToNo(item.endTime)
          ) {
            enable(item3);
          } else if (
            convertToNo(item3.startTime) === convertToNo(item.startTime) &&
            !document.getElementById(
              item3.startTime + '-' + item2.empNo + item3._id
            ).checked
          ) {
            enable(item3);
          } else {
            // if the slots don't clash
          }
        }
        employees.forEach((item4) => {
          if (
            document.getElementById(
              item.startTime + '-' + item4.empNo + item._id
            ).disabled
          ) {
            document.getElementById(
              item.startTime + '-' + item4.empNo + item._id
            ).disabled = false;
          }
        });
      });
    }
  };

  return (
    <>
      {slots.forEach((item) => {
        if (modules.indexOf(item.module) === -1) {
          modules.push(item.module);
        }
      })}
      {modules &&
        modules.map((item) => {
          return (
            <button
              className='btn btn-primary'
              onClick={() => {
                setModule(item);
              }}
            >
              {item}
            </button>
          );
        })}
      {module && (
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>No. of Modules</th>
              <th scope='col'>Hours</th>
              {/* {displaying the available slots on the table head} */}
              {slots.map((item) => {
                if (item.module === module && item.assigned === false)
                  return (
                    <th
                      style={{ background: '#5cdc3c', color: 'white' }}
                      id={item._id}
                    >
                      <tr className='d-flex justify-content-center'>
                        {item.startTime}-{item.endTime}
                      </tr>
                      <tr className='d-flex justify-content-center'>
                        {item.dayOfTheWeek}
                      </tr>
                      <tr className='d-flex justify-content-center'>
                        {item.venue}
                      </tr>
                      <tr className='d-flex justify-content-center'>
                        {item.module}
                      </tr>
                      <tr className='d-flex justify-content-center'>
                        {item.group}
                      </tr>
                      <tr className='d-flex justify-content-center'>
                        <p>Max: </p>
                        {item.staffRequirement}
                      </tr>
                    </th>
                  );
              })}
            </tr>
          </thead>
          <tbody>
            {employees.map((item2) => {
              return (
                <tr>
                  <td id={item2.empNo} style={{ background: 'white' }}>
                    {item2.empName}
                  </td>
                  <td>2</td>
                  <td>
                    {timetable.find((teacher) => teacher.empNo === item2.empNo)
                      ? timetable.find(
                          (teacher) => teacher.empNo === item2.empNo
                        ).hours
                      : '0'}
                  </td>
                  {slots.map((item) => {
                    if (item.module === module && item.assigned === false)
                      return (
                        <td className='flex-row justify-content-center'>
                          <input
                            className={'form' + '-check' + '-input'}
                            type='checkbox'
                            value=''
                            id={item.startTime + '-' + item2.empNo + item._id}
                            onInput={() => {
                              handleEvent(item, item2);
                            }}
                          ></input>
                        </td>
                      );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <button
        className='btn btn-success'
        onClick={() => {
          SubmitData();
        }}
      >
        Generate
      </button>
      <Link to='/allocatedSlot'>
        <button className='btn btn-success'>Allocated Slots</button>
      </Link>

      <h2 className='d-flex justify-content-center m-1'>Selected Slots</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>startTiming</th>
            <th>endTiming</th>
            <th>Teacher Name</th>
            <th>Hours</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {timetable
            ? timetable.map((item) => {
                return (
                  <tr>
                    <td>{item.startTime}</td>
                    <td>{item.endTime}</td>
                    <td>{item.empName}</td>
                    <td>{item.hours}</td>
                    <td>{item.module}</td>
                  </tr>
                );
              })
            : 'hello'}
        </tbody>
      </table>
      <AllocatedTime></AllocatedTime>
    </>
  );
};

TimeTableAllocate.propTypes = {
  getSlots: PropTypes.func.isRequired,
  deleteSlots: PropTypes.func.isRequired,
  timetable: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  Confirm: PropTypes.any,
};

const mapStateToProps = (state) => ({
  timetable: state.timetable,
  auth: state.auth,
  employee: state.employee,
});

export default connect(mapStateToProps, {
  getSlots,
  deleteSlots,
  getEmployees,
})(TimeTableAllocate);
