const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Module = require('../../model/modules') //importing admin model for line 24

// @route   POST api/module
// @desc    Register a module
// @access  Public
router.post('/', [
    check('moduleName', 'ModuleName is required').not().isEmpty(), //route validation
    check('ModuleID', 'Enter Valid module Code').not().isEmpty(),
    check('specialization', 'specialization is required').not().isEmpty(),
    check('year', 'year Of Study is required').not().isEmpty(),
    check('semester', 'Semester of Study').not().isEmpty()
    ], 
    async  (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const{ moduleName, ModuleID,specialization , year, semester} = req.body;

    try {
        
        //see if the module exists
        let module = await Module.findOne({ModuleID});
        if(module){
            res.status(400).json({errors: [{msg:'Module already exists'}]});
        }

        //initilize the admin variable(takes val from req,res body)
        module = new Module ({
            moduleName, ModuleID,specialization,year, semester
        });

        
        await module.save(); //saving module


        //Return jsonwebtoken

        res.send('Module Added Succesfully');
        

    }   catch(err){
        console.error(err.message);
        res.status(500).send('Server error')
    }   
});

module.exports = router;