import React, { Fragment,useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { deleteLeave,updatestatusByIDIns } from '../../actions/leaves';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';
const LeaveItem = ({leave,updatestatusByIDIns}) => {

  const navigate = useNavigate();
    const [value,SetValue]=useState('');
    const [dataSource,SetdataSource]=useState(leave);
    const [tableFilter,SetTableFilter]=useState([]);
    //const [sortvalue,SetsortValue]=useState('');
    const [disabled, setDisabled] = useState(true)
    const filterData=(e)=>{
      if(e.target.value!=""){
        SetValue(e.target.value);
        const filter=dataSource.filter(o=>Object.keys(o).some(k=>String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())));
        SetTableFilter([...filter]);
      }else{
        SetValue(e.target.value);
        SetdataSource([...dataSource]);
      }
  
    }
    const update=(id,empNo,name,email1,date)=>{
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Cancel it!'
      }).then((result) => {
        if (result.isConfirmed) {
          
          updatestatusByIDIns(id,"cancelled",empNo);
          
          Swal.fire(
  
            'Cancelled!',
            'The coordinator has been notified of the changes. ',
            'success'
          )
          let date1 = new Date().toISOString()?.split('T')[0];

          

          // This arrangement can be altered based on how we want the date's format to appear.
         
          console.log(date1); // "17-6-2022"
          let fullName = name;
          let Date1 = date;//applied ddate
          let emailid = email1;
            console.log(fullName,Date1,emailid);
              var contactParams = {
                  name: fullName,
                  date: Date1,
                  email: emailid
              };
          if (Date1 >= date1 ){
                  emailjs.send('service_5hilmhs', 'template_8g7iu5d',contactParams, 'mxh2UGjiVIpuyyKJP')
                  .then((result) => {
                        console.log(result.text);
                  }, (error) => {
                  console.log(error.text);
                  });
        }
        }
      })
     
    }


    const leaves =  value.length > 0 ? tableFilter.map((item,index) => (
    
        <tr key={item._id}>
          <td>{index+1}</td>
          <td id= {item.date}>{item.date}</td>
          <td>{item.starttimeoff}</td>
          <td>{item.Endtimeoff}</td>
          <td>{item.Message}</td>
          <td>{item.NumberofDays}</td>
          <td>{item.status}</td>
          <td>
            {' '}
            <button
            id='cancel'
              className='btn btn-danger'
            onClick={() => update(item._id,item.empNo,item.empName,item.CordinatorEmail,item.date)}
            disabled={item.date < new Date().toISOString().slice(0, 10)? true : false ||item.status == "cancelled" ? true :false}
            >
              <i className='fa fa-calendar-times-o'></i>
            </button>
          
          </td>
          
        </tr>
      )):  leave.map((item,index) => (
        
        <tr key={item._id}>
        <td>{index+1}</td>
        <td id= {item.date}>{item.date}</td>
        <td>{item.starttimeoff}</td>
        <td>{item.Endtimeoff}</td>
        <td>{item.Message}</td>
        <td>{item.NumberofDays}</td>
        <td>{item.status}</td>
      <td>
      {' '}
      <button
      id='cancel'
      className='btn btn-danger '
      onClick={() => update(item._id,item.empNo,item.empName,item.CordinatorEmail,item.date)}
      disabled={item.date < new Date().toISOString().slice(0, 10)? true :false||item.status == "cancelled" ? true : false}
       >
       <i className='fa fa-calendar-times-o'></i>
       </button>
       </td>
     
      </tr>
      ))
      return (
    
        <Fragment>
          <p className='lead'> Leave  Management</p>
         
                
                 
          <div>
        <input type='text' 
        placeholder='Search'
        value={value}
        onChange={filterData}/>
      </div>

      <table className='table'>
        <thead>
          <tr>
          <th className='hide-sm' style={{ textAlign: 'left' }}>
              Number
            </th>
            
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Date
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Start Time
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              End Time
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Message
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Number of Days
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Status
            </th>
            
            
            
            
            
          </tr>
        </thead>
        <tbody>{leaves}</tbody>
      </table>
      
    </Fragment>
  );
};

LeaveItem.propTypes = {
  leave: PropTypes.array.isRequired,
 
 updatestatusByIDIns:PropTypes.func.isRequired
 
};

export default connect(null,{updatestatusByIDIns})(LeaveItem);