const express = require('express'); // Imports express package
const router  = express.Router(); // Creates subroutes for /restaurants
const db = require('../db/connection');


router.post("/data", (req,res) => {
  // if(!req.body.text) {
  //   return res.redirect("/")
  // }
  
  // let randomOrderNumber = Math.floor(Math.random()*100000);
  //   //sends out SMS to restaurant
  //   client.messages.create({
  //     //who to send restaurant SMS to?
  //     to: process.env.MY_PHONE_NUMBER,
  //     //TWILIO PHONE NUMBER - should we have user name in text msg?
  //     from: '+18583305661',
  //     body: `Order #${randomOrderNumber}: ${req.body.text}. How long will it take to prepare this order?`
  //   })
  //   .then((data) => {
  //     console.log(data)
  //     res.redirect("/");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })

  let orders = `
  INSERT INTO
  orders (user_id, order_total)
  VALUES (1, ${req.body.totalPrice})
  RETURNING id`;

  return db.query(orders)
  .then((x)=>{
    let orderId = x.rows[0].id;

    let items = req.body.cartItems; // Array of order items


    items.forEach((x) => {

      let userOrders = `
      INSERT INTO
      order_items (menu_item_id, order_id)
      VALUES (${x.id}, ${orderId})
      `;

      db.query(userOrders, () => {
        console.log("Menu items inserted");
        // res.send("Insertion successful")
      });
    })
  })

});


module.exports = router; // Allows subroutes to be accessed
