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
module.exports = router;
