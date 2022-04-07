const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Admin = require('../../model/Admin') //imporating admin model for line 24

// @route   POST api/admin
// @desc    Register an Admin
// @access  Public
router.post('/', [
    check('userName', 'Username is required').not().isEmpty(), //route validation
    check('ID', 'SLIIT employee ID is required').not().isEmpty(),
    check('email', 'SLIIT employee email is required').not().isEmpty().isEmail(),
    check('password', 'A password should have minimum 6 characters').isLength({ min: 6 })
    ], 
    async  (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const{ userName, ID, email, password} = req.body;

    try {
        
    //see if the admin exists
    let admin = await Admin.findOne({email});
    if(admin){
        res.status(400).json({errors: [{msg:'Admin already exists'}]});
    }

    //initilize the admin variable(takes val from req,res body)
    admin = new Admin ({
        userName,ID,email,password
    });

    //get users gravatar 

    //encrypt password
    
    const salt = await bcrypt.genSalt(10); //hasing intilzied 
   
    admin.password = await bcrypt.hash(password, salt); //hasing assgined, next is saving to database
    console.log('reached here');

    await admin.save();//saving admin


    //Return jsonwebtoken
    const payload = {
        admin:{
            id: admin.id
        }
    }
jwt.sign(
    payload, 
    config.get('jwtSecret'),
    {expiresIn:360000}, //token expires in an hour, for now we keep a higher val for testing purposes
    (err, token)=>{
        if(err) throw err;
        res.json({ token }); // can send user id as well 
    }); 

    }   catch(err){
        console.error(err.message);
        res.status(500).send('Server error')
    }

    //see if the admin exists

    //get users gravatar 

    //encrypt password

    //Return jsonwebtoken

    
});

module.exports = router;