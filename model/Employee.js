const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  empNo: {
    type: String,
    unique: true,
    required: true,
  },
  empName: {
    type: String,
  },
  sliitEmail: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  vacancyStatus: {
    type: String,
  },
});

module.exports = Employee = mongoose.model('employee', EmployeeSchema); // Employee is the variable, employee is the name of the model, EmployeeSchema is the model schema
