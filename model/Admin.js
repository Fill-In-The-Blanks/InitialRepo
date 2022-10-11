const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    ID: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    userType : {
        type : String, 
        required : true,
    }, 
    department : {
        type : String, 
        required : true
    }
});

module.exports = Admin = mongoose.model("admin", AdminSchema); // Admin is the variable, admin is the name of the model, AdminSchema is the model schema
