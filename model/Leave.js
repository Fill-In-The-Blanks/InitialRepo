const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
    empNo: {
      type: String,
      
      required: true,
    },
    empName: {
      type: String,
    },
    CordinatorEmail: {
      type: String,
      
      required: true,
    },
    date: {
      type: Date,
      required:true,

    },
    starttimeoff: {
      type:String ,
      required: true,
    },
    Endtimeoff: {
      type:String,
      required: true,
    },
    Message: {
      type:String ,
      required: true,
    },
    NumberofDays: {
      type:Number ,
      required: true,
    },

    status: {
      type: String,
      default: 'false',
    },
  });
  
  module.exports = Leave = mongoose.model('leave', LeaveSchema);