const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
    moduleName: {
        type: String,
        required: true,
        
    },
    ModuleID: {
        type: String,
        required: true,
        unique: true
    },
    specialization: {
        type: String,
        required: true,
        
    },
    year: {
        type: String,
        required: true
    },
    semester:{
        type: String,
        required: true
    }
});

module.exports = Module = mongoose.model('module', ModuleSchema);  // Module is the variable, module is the name of the model, ModuleSchema is the model schema