const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Timetable = require('../../model/Timetable');
const { check, validationResult } = require('express-validator');
const Employee = require('../../model/Employee.js');
const Slot = require('../../model/Slot');
const Module = require('../../model/modules');
const Venues = require('../../model/Venues');
const transporter = require('../../mailConfig.js');

const template = require('../../emailTemplate');
const getMail = async (id) => {
  let user = await Employee.findOne({ empNo: id });
  // console.log(user)
  if (user) return user.sliitEmail;
};

const sendMail = (email, slot) => {
  let mailOptions = {
    from: 'testreceiver234@gmail.com',
    to: 'testmailer234@gmail.com',
    subject: 'Slot registeration email',
    html: template(slot),
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.json(err);
    } else {
      res.json(info);
    }
  });
};

// @route   GET api/timetable
// @desc    Get all slots
// @access  private
router.get('/', async (req, res) => {
  try {
    const slots = await Slot.find();
    res.json(slots);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/timetable/:id
// @desc    Delete slot by ID
// @access  private
router.delete('/:id', async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id);
    if (!slot) {
      return res.status(404).json({ msg: 'Slot Not Found' });
    }
    await slot.remove();
    res.json({ msg: 'Slot Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/timetable/
// @desc    Delete all slots
// @access  private
router.delete('/', async (req, res) => {
  try {
    await Slot.deleteMany();
    res.json('All slots deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/timetable/slot
// @desc    Update staff requirement of a slot
// @access  public
router.post('/slot', async (req, res) => {
  try {
    const test3 = await Slot.findByIdAndUpdate(req.body.slotID, {
      $set: { staffRequirement: req.body.staffRequirement },
    });
    const test4 = await Slot.find({ _id: req.body.slotID });
    res.status(200).send('Staff requirement updated');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/timetable/slots v1 [Has try catch in and outside the map]. v2 in employee api
// @desc    Add slots from excel sheet
// @access  private
router.post('/slots', auth, async (req, res) => {
  const sheet = req.body;
  const skippedEntries = [];

  try {
    /* console.log(sheet); */
    for (slot in sheet) {
      const startTime = sheet[slot][Object.keys(sheet[slot])[0]];
      const endTime = sheet[slot][Object.keys(sheet[slot])[1]];
      const dayOfTheWeek = sheet[slot][Object.keys(sheet[slot])[2]];
      const module = sheet[slot][Object.keys(sheet[slot])[3]];
      const venue = sheet[slot][Object.keys(sheet[slot])[4]];
      const group = sheet[slot][Object.keys(sheet[slot])[5]];

      /* let group = '',
        sessionType = '',
        staffRequirement = '';
      if (sheet[slot][Object.keys(sheet[slot])[5]][0] == 'Y') {
        group = sheet[slot][Object.keys(sheet[slot])[5]];
        sessionType = sheet[slot][Object.keys(sheet[slot])[6]];
        staffRequirement = sheet[slot][Object.keys(sheet[slot])[7]];
      } else {
        sessionType = sheet[slot][Object.keys(sheet[slot])[5]];
        staffRequirement = sheet[slot][Object.keys(sheet[slot])[6]];
      } */

      let found = await Slot.findOne({ startTime, dayOfTheWeek, group });

      let moduleObject = await Module.findOne({ moduleName: module });

      let venueObject = await Venues.findOne({ vName: venue }); // venueObject variable,

      if (found) {
        /* console.log(found + ' was found'); */
        continue;
      }

      slot = new Slot({
        startTime,
        endTime,
        dayOfTheWeek,
        module,
        venue,
        group,
      });

      if (!moduleObject) {
        moduleObject = new Module({
          moduleName: module,
        });

        await moduleObject.save();
      }

      if (!venueObject) {
        venueObject = new Venues({
          vName: venue,
        });

        await venueObject.save();
      }

      await slot.save();
    }
  } catch (error) {
    console.error(error.message);
  }
});

// @route   POST api/timetable/createTimetable
// @desc    Add allocations
// @access  public
router.post('/createTimeTable', async (req, res) => {
  // loop through all the selected allocations
  req.body.timetable.forEach(async (item) => {
    try {
      // to find all allocations of this instructor for a particular day
      // this is done to reject redundancies and overlapping allocations of the same instructor
      const allocations = await Timetable.find({
        empNo: item.empNo,
        day: item.dayOfTheWeek,
      }); //object

      // loop through existing allocations of the current instructor for a particular day
      for (const allocation in allocations) {
        let allocatedStartTime = allocations[allocation].startTime;
        let allocatedEndTime = allocations[allocation].endTime;
        let currentStartTime = item.startTime;
        let currentEndTime = item.endTime;

        // check if current session starts or ends within an existing sessions time
        if (
          (allocatedStartTime <= currentStartTime &&
            currentStartTime < allocatedEndTime) ||
          (allocatedStartTime < currentEndTime &&
            currentEndTime <= allocatedEndTime)
        ) {
          return;
        } // check if current session starts and ends over an existing session
        else if (
          currentStartTime <= allocatedStartTime &&
          allocatedEndTime < currentEndTime
        ) {
          return;
        }
      }

      let result = await new Timetable({
        module: item.module,
        startTime: item.startTime,
        endTime: item.endTime,
        hours: item.hours,
        empName: item.empName,
        empNo: item.empNo,
        venue: item.venue,
        day: item.dayOfTheWeek,
        slotID: item._id,
        batch: item.batch,
      }).save();
      sendMail(await getMail(item.empNo), item);
      let result2 = await Slot.updateOne({ _id: item._id }, { assigned: true });
    } catch (error) {
      res.status(500).send('Server error');
    }
  });
  res.status(200).send('Added allocations');
});

// @route   POST api/timetable/deleteSlots
// @desc    Delete an allocation
// @access  public
router.post('/deleteSlots', async (req, res) => {
  try {
    await Timetable.deleteMany({
      slotID: req.body.slotID,
      empNo: req.body.empNo,
    });
    const test3 = await Slot.findByIdAndUpdate(req.body.slotID, {
      $set: { assigned: false },
    });

    res.status(200).send('result');
  } catch (error) {
    res.status(500).send('internal server error');
  }
});

// @route   POST api/timetable/getTimetable
// @desc    Retrieve all allocations
// @access  public
router.get('/getTimeTable', async (req, res) => {
  try {
    const result = await Timetable.find();
    res.status(200).send(result);
  } catch (error) {}
});

// @route   POST api/timetable/getEmployeeTimeTable/:empNo
// @desc    ????
// @access  public
router.get('/getEmployeeTimeTable/:empNo', async (req, res) => {
  let time = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
  };
  try {
    const { empNo } = req.params;
    const slots = await Timetable.find({ empNo: empNo });
    slots.forEach((item) => {
      time[item.day] += item.hours;
      console.log(item.hours);
    });
    let hours = [
      time.Monday,
      time.Tuesday,
      time.Wednesday,
      time.Thursday,
      time.Friday,
    ];
    console.log(hours);
    res.status(200).json({ hours: hours });
  } catch (error) {
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

// @route   POST api/timetable/test
// @desc    To retrieve allocations of an instructor for a particular day
// @access  public
router.get('/test', async (req, res) => {
  const { empNo, day } = req.body;
  try {
    const result = await Timetable.find({ empNo: empNo, day: day });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
