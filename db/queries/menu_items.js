const db = require('../connection');

const getMenuitems = () => {
  return db.query('SELECT * FROM menu_items;')
  .then(data => {
    console.log(data.rows[0]);
    return data.rows[0];
  })
  .catch(error => {
    console.log(error);
  });
  
};

console.log(getMenuitems());

module.exports = { getMenuitems };