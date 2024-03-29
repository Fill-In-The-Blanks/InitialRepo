const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Timetable = require('../../model/Timetable');
const { check, validationResult } = require('express-validator');

// @route   GET api/timetable2/:module
// @desc    Get all allocations for a particular module
// @access  public
router.get('/:module', async (req, res) => {
  try {
    const module = await Timetable.find({ module: req.params.module });

    if (!module) {
      return res.status(404).json({ msg: 'Module not Allocated' });
    }

    res.json(module);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'String') {
      return res.status(404).json({ msg: 'module not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
