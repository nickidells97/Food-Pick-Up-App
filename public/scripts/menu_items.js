$(document).ready(() => {


  const createMenuItem = (obj) => {
    const menu =  `

    <div class ="menu-items">
    <form method="POST" class="menu">
      <input type="hidden" class="item_id" name="menu_id" value="${obj.id}"/>
        <div class="menu-container">
        <img class ="menu-display" src=${obj.item_photo} width="125" height="125">
          <div class="menu-info">
            <h5 class="menu-title"> ${obj.item_name}!</h1>
            <span> ${obj.item_description} </span>
            <div class="info-footer">
              <span class="price"> Price: $${obj.item_price} </span>
              <button type="submit">Add to cart</button>
            </div>
          </div>
        </div>
      </form>
    </div>
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

  let cartItems = [];

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
            cartItems.push({id: itemID, price: found.item_price});
            let cart = createCartItem(found, cartItem);
            $('#cart-container').prepend(cart);

            $(`.deleteButton${cartItem}`).on('click', function(event) {
              event.preventDefault();
              $(`#itemIs${cartItem}`).remove();
              let index = cartItems.indexOf(found.id)
              cartItems.splice(index, 1);
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


   $("#order_items").on('submit', function(event) {
      event.preventDefault();
      let totalPrice = 0;
      cartItems.forEach((element) => {
          totalPrice += element.price
      })


      $.ajax({url:"/data", method: "POST", data: {totalPrice, cartItems}})

      
    })


  loadMenuItems();
});
