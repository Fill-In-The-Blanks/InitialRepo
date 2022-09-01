const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

const Notice = require("../../model/Notices"); //importing Module model for line 24

// @route   POST api/module
// @desc    Register a module
// @access  Public

router.post(
  "/",
  [
    check("noticeNo", "Notice No is required").not().isEmpty(), //route validation
    check("heading", "Enter Valid heading").not().isEmpty(),
    check("content", "Content is required").not().isEmpty(),
    check("author", "author is required").not().isEmpty(),
    check("start", "Start Date is required").not().isEmpty(),
    check("end", "End Date is required").not().isEmpty(),
  ],
  async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { noticeNo, heading, content, author, start, end } = req.body;
    try {
      
      let notice = await Notice.findOne({ noticeNo });
      if (notice) {
        res.status(400).json({ errors: [{ msg: "Notice already exists" }] });
      }

      notice = new Notice({
        noticeNo,
        heading,
        content,
        author,
        start,
        end,
      });

      await notice.save();

      res.send("Notice Added Succesfully");
    } catch (err) {
      console.error(err.message);
    }
  }
);

//Start from here 
// @route   GET api/module
//@desc get all module details
// @access  Public

router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find();
    res.json(notices);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});






// @route   DELETE api/module
//@desc get all module details
// @access  Public

router.delete('/:id', async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ msg: 'Notice Not Found' });
    }

    await notice.remove();
    res.json({ msg: 'Notice Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
