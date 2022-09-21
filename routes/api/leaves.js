const express = require('express');
const router = express.Router();

const config = require('config');
const { check, validationResult } = require('express-validator');

const Leave = require('../../model/Leave');

// @route   POST api/leave
// @desc    Register a module
// @access  Public

router.post(
    '/',[

    check('empNo', 'Employee Number is required').not().isEmpty(), //route validation
    check('empName', 'Enter Valid Name').not().isEmpty(),
    check('CordinatorEmail', 'Coordinator Email is required').not().isEmpty().normalizeEmail(),
    check('date', 'Date of Leave').not().isEmpty(),
    check('starttimeoff', ' Start Time off is required').not().isEmpty(),
    check('Endtimeoff', ' Ending Time off is required').not().isEmpty(),
    check('Message', ' Message is required').not().isEmpty(),


    
    ],async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { empNo , empName, CordinatorEmail, date,starttimeoff,Endtimeoff,  Message, NumberofDays,status } = req.body;
    
    try{//Set status to pending which will be changed by coordinator if approved
    
    let leave = new Leave ({
        empNo , 
        empName, 
        CordinatorEmail, 
        date, 
        starttimeoff,
        Endtimeoff,
        Message, 
        NumberofDays,
        status

    });

    await leave.save();
    res.send('Leave Request has been Sent');
} catch (err) {
  console.error(err.message);
  
}

    
});



// @route   GET api/leaves
//@desc get all leave details
// @access  Public

router.get('/', async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.json(leaves);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   DELETE api/leave
//@desc delete leave details
// @access  Public

router.delete('/:id', async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ msg: 'Leave Not Found' });
    }

    await leave.remove();
    res.json({ msg: 'Leave Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;