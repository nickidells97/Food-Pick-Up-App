$(document).ready(() => {


  const createMenuItem = (obj) => {

    const menu =  `
    <form method="POST" class="menu">
            <input type="hidden" class="item_id" name="menu_id" value="${obj.id}"/>
            <div>
              <h5> ${obj.item_name}!</h1>
      <img src="https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" width="200" height="200">
      <span> ${obj.item_description} </span>
      <span> Price: $ ${obj.item_price} </span>
              <button type="submit">Add to cart</button>
            </div>
          </form>
    `;
    return menu;
  };

  const renderMenuItems = (data) => {
    for (const item of data) {
      let menu = createMenuItem(item);

      $('#menu-container').append(menu);
    }
  };

  const createCartItem = (item, cartItem) => {

    const cartItems = `
    <div type="hidden" value="${cartItem}"/>
    <div id="itemIs${cartItem}">${item.item_name} - $ ${item.item_price}
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
        $(".menu").on('submit', function(event) {
          event.preventDefault();
          let itemID = $(this).children('.item_id')[0].value;
          cartItem += 1;
          const renderCartItems = (data) => {

            const found = data.find(element => element.id == itemID);

            let cart = createCartItem(found, cartItem);
            $('#cart-container').prepend(cart);
            $(`.deleteButton${cartItem}`).on('click', function(event) {
              event.preventDefault();
              $(`#itemIs${cartItem}`).remove();
              price -= found.item_price;
              cartItem -= 1;
              $('#order-total').text('Order Total:' + price);
            });
            price += found.item_price;
            $('#order-total').text('Order Total:' + price);

          };
          renderCartItems(data);
        });
      });
  };
  loadMenuItems();
});
