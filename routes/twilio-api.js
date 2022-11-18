const express = require('express'); // Imports express package
const router  = express.Router(); // Creates subroutes for /
// const db = require('../db/connection');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio') (accountSid,authToken);


// 1.capture total order and send it to twilio phone number
// 2.restaurant receive order (and it shows on restaurant page?)
// 3.dynamically respond with time until order is ready (or for v1 just any time)
// 4.client-side website updates with time left to pickup

//route name
router.post("/usercart" , (req,res) => {

  // exports.handler = (context, event, callback) => {
  //   // Create a new messaging response object
  //   const twiml = new Twilio.twiml.MessagingResponse();
  
  //   // Access the incoming text content from `event.Body`
  //   const incomingMessage = event.Body.toLowerCase();
  
  //   // Use any of the Node.js SDK methods, such as `message`, to compose a response
  //   if (incomingMessage.includes('hello')) {
  //     twiml.message('Your order will be ready for pickup in 15-20 min!');
  //   } else if (incomingMessage.includes('bye')) {
  //     twiml.message('Goodbye!');
  //   } else {
  //     twiml.message('Not sure what you meant! Please say hello or bye!');
  //   }
  
  //   // Return the TwiML as the second argument to `callback`
  //   // This will render the response as XML in reply to the webhook request
  //   return callback(null, twiml);
  // };
if(!req.body.ordertext) {
  return res.redirect("/")
}

let randomOrderNumber = Math.floor(Math.random()*100000);
  //sends out SMS to restaurant
  client.messages.create({
    //who to send restaurant SMS to?
    to: process.env.MY_PHONE_NUMBER,
    //TWILIO PHONE NUMBER - should we have user name in text msg?
    from: '+18583305661',
    body: `Order #${randomOrderNumber}: ${req.body.ordertext}. How long will it take to prepare this order?`
  })
  .then(() => {
    res.redirect("/");
  }
  )
  .catch((err) => {
    console.log(err);
  })
})

module.exports = router; // Allows subroutes to be accessed