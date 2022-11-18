const express = require('express'); // Imports express package
const router  = express.Router(); // Creates subroutes for /restaurants
const db = require('../db/connection');


router.post("/data", (req,res) => {

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
      });
    })

  })

});


module.exports = router; // Allows subroutes to be accessed
