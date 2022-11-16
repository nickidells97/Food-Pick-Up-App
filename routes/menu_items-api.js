const express = require('express'); // Imports express package
const router  = express.Router(); // Creates subroutes for /public/routes
const db = require('../db/connection');


router.get("/data", (req,res) => {
  console.log("hello");
  let menuItems = `
  SELECT * FROM menu_items;
  `;
  
  db.query(menuItems)
    .then(data => {
      const menu = data.rows;
      res.json(menu);
    })
  
});


module.exports = router; // Allows subroutes to be accessed