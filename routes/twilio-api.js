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

  //update the restaurant what the order is
  exports.handler = (context, event, callback) => {
    // Create a new messaging response object
    const twiml = new Twilio.twiml.MessagingResponse();
  
    // Access the incoming text content from `event.Body`
    const incomingMessage = event.Body.toLowerCase();
  
    // Use any of the Node.js SDK methods, such as `message`, to compose a response
    if (incomingMessage.includes('hello')) {
      twiml.message('Hello, there!');
    } else if (incomingMessage.includes('bye')) {
      twiml.message('Goodbye!');
    } else {
      twiml.message('Not sure what you meant! Please say hello or bye!');
    }
  
    // Return the TwiML as the second argument to `callback`
    // This will render the response as XML in reply to the webhook request
    return callback(null, twiml);
  };
 


  //sends out message to user
  client.messages.create({
    to: process.env.MY_PHONE_NUMBER,
    //TWILIO PHONE NUMBER
    from: '+18583305661',
    body: 'Your order will be ready in 15 minutes'
  })
  .then(() => {
//integrate after text is sent to add total order to order history
//then res.redirect to home page
    res.send("ok");
  }
  )
})


module.exports = router; // Allows subroutes to be accessed