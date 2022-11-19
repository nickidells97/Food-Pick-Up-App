const express = require('express'); // Imports express package
const router  = express.Router(); // Creates subroutes for /

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio') (accountSid,authToken);
// 4.client-side website updates 

//route name
router.post("/usercart" , (req,res) => {
console.log("request");

// if(!req.body.ordertext) {
//   return res.redirect("/")
// }

let randomOrderNumber = Math.floor(Math.random()*100000);
  //sends out SMS to restaurant
  client.messages.create({
    //who to send restaurant SMS to?
    to: process.env.MY_PHONE_NUMBER,
    //TWILIO PHONE NUMBER - should we have user name in text msg?
    from: '+18583305661',
    body: `Order #${randomOrderNumber}: ${req.body.ordertext}. How long will it take to prepare this order?`
  })
  .then((data) => {
    console.log(data)
    res.redirect("/");
  })
  .catch((err) => {
    console.log(err);
  })

});


module.exports = router; // Allows subroutes to be accessed