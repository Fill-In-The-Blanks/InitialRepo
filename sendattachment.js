const transporter = require("./mailConfig")

const sendMail =async (pdf)=>
{
    
    
    // let emails = await getMail()
   
    // emails.forEach(async (item)=>{
    //   //to send emails to the real user add sliitEmail instead of mail
    //   // let mailOptions = {
    //   //   from: "testreceiver234@gmail.com",
    //   //   to: item.slittEmail,
    //   //   subject: "Slot registeration email",
    //   //   html: tempelate2(notice)
    //   // }
    //   // await transporter.sendMail(mailOptions, (err, info) => {
    //   //   if (err) {
    //   //     return console.log(err)
    //   //   }
    //   //   else {
    //   //     return info
    //   //   }
    //   // })
    // })
    let mailOptions = {
      from: "testreceiver234@gmail.com",
      to: "testmailer234@gmail.com",
      subject: "Personal timeTable email",
      attachments: [
        {
          path:pdf
        }
      ]
    }
    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err)
      }
      else {
        return info
      }
    })
}



module.exports = { sendMail };