const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
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
      .isEmpty()
      .toLowerCase(),
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
      }
      if (employeeEmail) {
        res.status(400).json({ errors: [{ msg: 'Employee email is used' }] });
      }
      if (employeePhone) {
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
      /* res.status(500).send('Server error');  Bug fixing */
      /* return; */
    }
  }
);

// @route   GET api/employee
// @desc    Get all employees
// @access  private
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/employee/employees v1 [Has try catch in and outside the map]
// @desc    Add employees
// @access  private
router.post('/employees', auth, async (req, res) => {
  const sheet = req.body;
  const skippedEntries = [];
  try {
    //forEach version
    for (employee in sheet) {
      const { empNo, empName, sliitEmail, phone, department, vacancyStatus } =
        sheet[employee];

      let employeeNo = await Employee.findOne({ empNo });
      let employeeEmail = await Employee.findOne({ sliitEmail });
      let employeePhone = await Employee.findOne({ phone });
      if (employeeNo) {
        /* skippedEntries.push('This employee no ' + empNo + ' already exists'); */
        continue;
      }
      if (employeeEmail) {
        /* skippedEntries.push(
          'This employee email ' + sliitEmail + ' already exists'
        ); */
        continue;
      }
      if (employeePhone) {
        /* skippedEntries.push('This phone number ' + phone + ' already exists'); */
        continue;
      }

      employee = new Employee({
        empNo: empNo,
        empName: empName,
        sliitEmail: sliitEmail,
        phone: phone,
        department: department,
        vacancyStatus: vacancyStatus,
      });

      await employee.save();
    }
    //forEach version ends

    //map version
    /* const filteredSheet = await sheet.filter(async (employee) => {
      const { empNo, sliitEmail, phone } = employee;

      try {
        console.log(1);
        let employeeNo = await Employee.findOne({ empNo });
        console.log(12);
        let employeeEmail = await Employee.findOne({ sliitEmail });
        let employeePhone = await Employee.findOne({ phone });

        if (employeeNo) {
          skippedEntries.push('This employee no ' + empNo + ' already exists');
          return false;
        }
        if (employeeEmail) {
          skippedEntries.push(
            'This employee email ' + sliitEmail + ' already exists'
          );
          return false;
        }
        if (employeePhone) {
          skippedEntries.push('This phone number ' + phone + ' already exists');
          return false;
        }
      } catch (error) {
        console.error(error.message);
      }
    });
    await filteredSheet.map(async (employee) => {
      const { empNo, empName, sliitEmail, phone, department, vacancyStatus } =
        employee;

      try {
        employee = new Employee({
          empNo: empNo,
          empName: empName,
          sliitEmail: sliitEmail,
          phone: phone,
          department: department,
          vacancyStatus: vacancyStatus,
        });

        console.log(2);

        await employee.save();
      } catch (error) {
        console.log(22);
        console.error(error.message);
      }
    }); */

    /* await sheet.map(async (employee) => {
      const { empNo, empName, sliitEmail, phone, department, vacancyStatus } =
        employee;

      try {
        let employeeNo = await Employee.findOne({ empNo });
        let employeeEmail = await Employee.findOne({ sliitEmail });
        let employeePhone = await Employee.findOne({ phone });
        if (employeeNo) {
          skippedEntries.push('This employee no ' + empNo + ' already exists');
        }
        if (employeeEmail) {
          skippedEntries.push(
            'This employee email ' + sliitEmail + ' already exists'
          );
        }
        if (employeePhone) {
          skippedEntries.push('This phone number ' + phone + ' already exists');
        }

        employee = new Employee({
          empNo: empNo,
          empName: empName,
          sliitEmail: sliitEmail,
          phone: phone,
          department: department,
          vacancyStatus: vacancyStatus,
        });
        await employee.save();
      } catch (error) {
        console.error(error.message);
      }
    }); */
    //map version ends

    async function end() {
      await console.log(skippedEntries);
      await res.json(skippedEntries);
    }
    await end();
  } catch (error) {
    console.error(error.message);
  }
});

// @route   POST api/employee/employees v2 [Has try catch only within map]
// @desc    Add employees
// @access  private
/* router.post('/employees', auth, async (req, res) => {
  const sheet = req.body;
  sheet.map(async (employee) => {
    const { empNo, empName, sliitEmail, phone, department, vacancyStatus } =
      employee;
    try {
      let employeeNo = await Employee.findOne({ empNo });
      let employeeEmail = await Employee.findOne({ sliitEmail });
      let employeePhone = await Employee.findOne({ phone });
      if (employeeNo) {
        res.status(400).json({ errors: [{ msg: 'Employee already exists' }] });
      }
      if (employeeEmail) {
        res.status(400).json({ errors: [{ msg: 'Employee email is used' }] });
      }
      if (employeePhone) {
        res
          .status(400)
          .json({ errors: [{ msg: 'Employee phone number is used' }] });
      }

      employee = new Employee({
        empNo: empNo,
        empName: empName,
        sliitEmail: sliitEmail,
        phone: phone,
        department: department,
        vacancyStatus: vacancyStatus,
      });

      await employee.save();
    } catch (error) {
      console.error(error.message);
    }
  });
}); */

module.exports = router;
