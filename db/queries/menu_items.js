const db = require('../connection');

const getMenuitems = () => {
  return db.query('SELECT * FROM menu_items;')
  .then(data => {
    return data.rows[0];
  });
};

module.exports = { getMenuitems };