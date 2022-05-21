const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Slot = require('../../model/Slot');

// @route   POST api/timetable/slots v1 [Has try catch in and outside the map]. v2 in employee api
// @desc    Add slots
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
      let group = '',
        sessionType = '',
        staffRequirement = '';
      if (sheet[slot][Object.keys(sheet[slot])[5]][0] == 'Y') {
        group = sheet[slot][Object.keys(sheet[slot])[5]];
        sessionType = sheet[slot][Object.keys(sheet[slot])[6]];
        staffRequirement = sheet[slot][Object.keys(sheet[slot])[7]];
      } else {
        sessionType = sheet[slot][Object.keys(sheet[slot])[5]];
        staffRequirement = sheet[slot][Object.keys(sheet[slot])[6]];
      }

      let found = await Slot.findOne({ startTime, dayOfTheWeek, group });
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
        sessionType,
        staffRequirement,
      });

      await slot.save();
    }
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
