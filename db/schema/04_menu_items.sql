DROP TABLE IF EXISTS menu_items CASCADE;

CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  item_name CHAR(50) NOT NULL,
  item_price INT NOT NULL,
  item_description TEXT NOT NULL,
  order_duration INTEGER NOT NULL,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE
);
