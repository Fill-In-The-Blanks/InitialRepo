const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service  : "gmail", 
    auth : {
        user : "adhilajmal123@gmail.com", 
        pass: 'kmiynuetzmhrpjbj'
    }
})
//create function to send email by nodemailer

module.exports = transporter 