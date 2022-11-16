const express = require('express'); // Imports express package
const router  = express.Router(); // Creates subroutes for /restaurants
const db = require('../db/connection');


router.post("/data", (req,res) => {

  let userOrders = `
  INSERT INTO
  order_items (menu_item_id, order_id)
  VALUES (${req}, ${orderID})
  `;

  db.query(userOrders, () => {
    console.log("1 record inserted");
  });
});


module.exports = router; // Allows subroutes to be accessed
