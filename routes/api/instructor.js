const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Instructor = require('../../model/Instructor'); //importing admin model for line 24
const Instructor = require('../../model/Instructor');

// @route   POST api/instructor
// @desc    Register an Instructor
// @access  Public
router.post(
  '/',
  [
    check('userName', 'Username is required').not().isEmpty(), //route validation
    check('ID', 'SLIIT instrcutor ID is required').not().isEmpty(),
    check('email', 'SLIIT instructor email is required')
      .not()
      .isEmpty()
      .isEmail(),
    check('password', 'A password should have minimum 6 characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userName, ID, email, password } = req.body;

    try {
      //see if the instructor exists
      let instructor = await Instructor.findOne({ email });
      if (instructor) {
        res
          .status(400)
          .json({ errors: [{ msg: 'Instructor already exists' }] });
      }

      //initilize the instructor variable(takes val from req,res body)
      instructor = new Instructor({
        userName,
        ID,
        email,
        password,
      });

      //get users gravatar

      //encrypt password

      const salt = await bcrypt.genSalt(10); //hasing intilzied

      instructor.password = await bcrypt.hash(password, salt); //hasing assgined, next is saving to database

      await Instructor.save(); //saving admin

      //Return jsonwebtoken
      const payload = {
        instrctor: {
          id: instructor.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 }, //token expires in an hour, for now we keep a higher val for testing purposes
        (err, token) => {
          if (err) throw err;
          res.json({ token }); // can send user id as well
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
