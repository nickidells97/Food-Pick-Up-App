$(document).ready(() => {


  const createMenuItem = (obj) => {

    // console.log(obj);
    const menu =  `
    <form method="POST">
            <input type="hidden" name="menu_id" value="${obj.id}"/>
            <div>
              <h5> ${obj.item_name}!</h1>
      <img src="https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" width="200" height="200">
      <span> ${obj.item_description} </span>
      <span> Price: ${obj.item_price} </span>
              <button type="submit">Add to cart</button>
            </div>
          </form>
    `;
    return menu;
  };

  const renderMenuItems = (data) => {
    let menu = createMenuItem(data);
    $('#menu-container').prepend(menu);
  };

  const createCartItem = (obj, cartItem) => {
    const cartItems = `
    <div id="itemIs${cartItem}">${obj.item_name} - $ ${obj.item_price}
    <form method="DELETE">
    <button class="deleteButton${cartItem}">Delete</button>
    </form>
    <div>
    `;
    return cartItems;
  };


  const loadMenuItems = function() {
    $.ajax("data",{method: "GET"})
      .then(function(data) {
        renderMenuItems(data);
        let cartItem = 0;
        let price  = 0;
        // add and render items to cart element
        $("form").on('submit', function(event) {
          event.preventDefault();
          cartItem += 1;
          const renderCartItems = (data) => {
            let cart = createCartItem(data, cartItem);
            $('#cart-container').prepend(cart);
            $(`.deleteButton${cartItem}`).on('click', function(event) {
              event.preventDefault();
              $(`#itemIs${cartItem}`).remove();
              price -= data.item_price;
              cartItem -= 1;
              $('#order-total').text('Order Total:' + price);
            });
            price += data.item_price;
            $('#order-total').text('Order Total:' + price);
          };
          renderCartItems(data);
        });
      });
  };
  loadMenuItems();
});
