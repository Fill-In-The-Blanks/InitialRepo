import React, { Fragment,useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import logo from '../../img/sllit logo.png'
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';
import axios from 'axios';






var empNo;
var pdfOutput;
var instructorName;
const pdfGenerate =()=>{
  var doc=new jsPDF('landscape','px','a4','false');
 
  autoTable(doc, { html: '#mytimeTable' ,didDrawPage: function (data) {

    // Header
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.text( "        Personal Timetable for:"+`${instructorName}`, data.settings.margin.right, 22);
    doc.addImage(logo,'PNG',data.settings.margin.right,8, 20, 20)
    
    
    // Footer
    var str = "Page " + doc.internal.getNumberOfPages();
   
    doc.setFontSize(10);

    // jsPDF 1.4+ uses getWidth, <1.4 uses .width
    var pageSize = doc.internal.pageSize;
    var pageHeight = pageSize.height
      ? pageSize.height
      : pageSize.getHeight();
    doc.text(str, data.settings.margin.left, pageHeight - 10);
  }})
 
  doc.save('my_timetable.pdf')
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'File Downloaded',
    showConfirmButton: false,
    timer: 1500
  })
  
  
  pdfOutput = doc.output("datauristring");

  return pdfOutput;
  
 




}




const AdminInstructorItem = ({timetable1}) => {
  
  const sendReminder = (empNo)=>{
    console.log(empNo);
    Swal.fire({
      title: 'Do you want to email the attachment?',
      text: "The timetable will be emailed to the instructor!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Remind!'
    }).then((result) => {
      if (result.isConfirmed) {
        let pdf=pdfGenerate();
        let emp1=empNo;
        
        
        axios.post('/api/personalTimetable/sendtable',{pdf1:pdf,emp:emp1})
        .then(body=>console.log(body))
        .catch(err=>console.log(err))
        Swal.fire(
  
          'Sent!',
          'Reminder has been Sent.',
          'success'
        )
      }
    })
   
  }

  const navigate = useNavigate();
    const [value,SetValue]=useState('');
    const [dataSource,SetdataSource]=useState(timetable1);
    const [tableFilter,SetTableFilter]=useState([]);
    //const [sortvalue,SetsortValue]=useState('');
    const [emphour, setEmphours] = useState([])
    const [timeTable, setTimeTable] = useState([]);

    useEffect(() => {
      axios
        .get('/api/timetable/getTimeTable')
        .then((body) => setTimeTable(body.data))
        .catch((err) => console.log(err));
    }, []);
    
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

    
    const handleFilter = (value)=>{
      SetValue(value);
      const filterData=dataSource.filter(timetable1=>timetable1.day===value);
      SetTableFilter([...filterData]);
    
    }
  

    const timetables =  value.length > 0 ? tableFilter.map((item) => (
      
        <tr key={item._id}>
        
          <td>{item.day}</td>
          <td>{item.startTime}</td>
          <td>{item.endTime}</td>
          <td>{item.venue}</td>
          
          <td style = {{display:"none"}}>{empNo=item.empNo}</td> 
          <td>{item.hours}</td>
          <td style = {{display:"none"}}>{instructorName= item.empName}</td>
          <td>{
                emphour.map((item3) => {
                          if (item.empNo === item3.empNo) {
                            return (<p>
                              {item3.hours}
                            </p>)
                          }
                        })
                      }</td>
          
          
        </tr>
      )):  timetable1.map((item) => (
        
        
        <tr key={item._id}>
          
          <td>{item.day}</td>
          <td>{item.startTime}</td>
          <td>{item.endTime}</td>
          <td>{item.venue}</td>
          
          <td style = {{display:"none"}}>{empNo=item.empNo}</td> 
          <td>{item.hours}</td>
          <td style = {{display:"none"}}>{instructorName= item.empName}</td>
          
          
        </tr>
      ))
      return (
    
        <Fragment>
         
         <div className='search'>         
    
    <input type='text' 
    placeholder='Search'
    
    value={value}
    onChange={filterData}/>
  </div>
                
      <button className=' btn btn-success'  onClick={()=>handleFilter("Monday")}>Monday</button>
       <button className=' btn btn-success'onClick={()=>handleFilter("Tuesday")}>Tuesday</button>
       <button className=' btn btn-success'onClick={()=>handleFilter("Wednesday")}>Wednesday</button>
       <button className='  btn btn-success'onClick={()=>handleFilter("Thursday")}>Thursday</button>
       <button className=' btn btn-success'onClick={()=>handleFilter("Friday")}>Friday</button>
       <button className='  btn btn-success'onClick={()=>handleFilter("Saturday")}>Saturday</button>
       <button className='  btn btn-success'onClick={()=>handleFilter("Sunday")}>Sunday</button><br/>
               
         

      <table className='table' id='mytimeTable'>
        <thead>
          <tr>
            <th>Day</th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Start Time
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
             End Time
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Venue
            </th>
          
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Hours
            </th>
           
            
            
            
            
            
          </tr>
        </thead>
        <tbody>{timetables}</tbody>
      </table>



      
      <Link to='/listEmployees'>
      <button className='btn btn-success' ><i className='fas fa-backspace'></i> Back</button>
      </Link>
      <button className='btn btn-success' onClick={()=> sendReminder(empNo)}><i className='fa fa-envelope'></i>
         {''} Send Mail
          </button>
    </Fragment>
  );
};

AdminInstructorItem.propTypes = {
  timetable1: PropTypes.array.isRequired,
 
 
};





export default connect(null)(AdminInstructorItem,pdfGenerate);