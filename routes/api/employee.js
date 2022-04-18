const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Employee = require('../../model/Employee');

// @route   POST api/employee
// @desc    Add employee
// @access  private
router.post(
  '/',
  auth,
  [
    check('empNo', 'Must provide a valid SLIIT employee number')
      .not()
      .isEmpty(),
    check('sliitEmail', 'Must provide a valid SLIIT employee email')
      .not()
      .isEmpty()
      .isEmail()
      .normalizeEmail(),
    check('phone', 'Must provide a phone number')
      .not()
      .isEmpty()
      .isMobilePhone(),
    check('department', 'Must be assigned a department').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { empNo, empName, sliitEmail, phone, department, vacancyStatus } =
      req.body;

    try {
      //see if the employee exists
      let employeeNo = await Employee.findOne({ empNo });
      let employeeEmail = await Employee.findOne({ sliitEmail });
      let employeePhone = await Employee.findOne({ phone });
      if (employeeNo) {
        res.status(400).json({ errors: [{ msg: 'Employee already exists' }] });
      } else if (employeeEmail) {
        res.status(400).json({ errors: [{ msg: 'Employee email is used' }] });
      } else if (employeePhone) {
        res
          .status(400)
          .json({ errors: [{ msg: 'Employee phone number is used' }] });
      }

      employee = new Employee({
        empNo,
        empName,
        sliitEmail,
        phone,
        department,
        vacancyStatus,
      });

      await employee.save();

      res.json(employee);
      console.log(employee);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
