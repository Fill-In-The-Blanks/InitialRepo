const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// @route   POST api/admin
// @desc    Register an Admin
// @access  Public
router.post('/', [
    check('userName', 'Username is required').not().isEmpty(),
    check('ID', 'SLIIT employee ID is required').not().isEmpty(),
    check('email', 'SLIIT employee email is required').not().isEmpty().isEmail(),
    check('password', 'A password should have minimum 6 characters').isLength({ min: 6 })
    ], 
    (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    res.send('Admin route'); 
});

module.exports = router;