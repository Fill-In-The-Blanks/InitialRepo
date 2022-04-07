const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Admin = require('../../model/Admin');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
        const admin = await Admin.findById(req.admin.id).select('-password');
        res.json(admin);
  } catch(err){
  console.error(err.message);
  res.status(500).send('Server Error')
    
}
});




module.exports = router;