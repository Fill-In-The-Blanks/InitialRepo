const express = require('express');
const router = express.Router();

const config = require('config');
const { check, validationResult } = require('express-validator');

//importing venues model for line 24
const Venues = require('../../model/Venues');
// @route   POST api/module
// @desc    Register a module
// @access  Public
router.post(
  '/',
  [
    check('vName', 'Venue Name is required').not().isEmpty(), //route validation
    check('vID', 'Enter Valid Venue Code').not().isEmpty(),
    check('type', 'type of venue is required').not().isEmpty(),
    check('size', 'size is required').not().isEmpty(),
    check('floor', 'floor is required').not().isEmpty(),
    check('faculty', 'faculty is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { vName, vID, type, size, floor, faculty } = req.body;

    try {
      //see if the module exists
      let venue = await Venues.findOne({ vID });
      if (venue) {
        res.status(400).json({ errors: [{ msg: 'venue already exists' }] });
      }

      //initilize the admin variable(takes val from req,res body)
      venue = new Venues({
        vName,
        vID,
        type,
        size,
        floor,
        faculty,
      });

      await venue.save(); //saving module

      //Return jsonwebtoken

      res.send('Venue Added Succesfully');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
module.exports = router;
