SELECT order_items.order_id, users.first_name as user_name, users.email as email, users.phone as phone , menu_items.item_name as name, menu_items.item_price, menu_items.order_duration as duration
  FROM order_items
  JOIN menu_items ON menu_items.id = menu_item_id
  JOIN orders ON orders.id = order_items.order_id
  JOIN users ON users.id = orders.user_id;