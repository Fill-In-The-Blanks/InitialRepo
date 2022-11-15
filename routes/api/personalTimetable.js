const express = require("express");
const router = express.Router();

const path = require("path");
const { check, validationResult } = require("express-validator");
const fs = require ("fs")
//const pdfGenerate = require('../../frontend/src/components/AdminInstrcutorTimetable/AdminTimetableitem');
const Employee = require('../../model/Employee.js');
const transporter = require("../../mailConfig")
const getMail = async (id) => {
  let user = await Employee.findOne({ empNo: id })
  // console.log(user)
  if (user)
    return user.sliitEmail
}
const sendMail =async (mail,pdf)=>
{
   
    

    let mailOptions = {
      from: "testreceiver234@gmail.com",
      to: mail,
      subject: "Personal timeTable email",
      text:"Please find your Timetable attached",
      attachments: [
        {
          path:pdf,
          filename:"Timetable.pdf"
        }
      ]
    }
    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err)
      }
      else {
        return info
      }
    })
}

router.post("/sendtable" , async(req , res)=>{
   
    const pdf = req.body.pdf1;
    const emp = req.body.emp;
    
   
    try {
     
      sendMail( await getMail(emp),pdf);
      res.status(200).json({msg : "message sent successfully"})
    } catch (error) {
      return res.status(500).json({msg : error.message})
    }
  })

module.exports = router;