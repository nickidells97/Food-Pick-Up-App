$(document).ready(() => {

  //create html for each menu item in our db
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

  //render the menu items to our html
  const renderMenuItems = (data) => {
    for (const item of data) {
      let menu = createMenuItem(item);

      $('#menu-container').append(menu);
    }
  };

  //create cart item html for each individual item that is selected
  const createCartItem = (item, cartItem) => {

    const cartItems = `
    <div type="hidden" value="${cartItem}"/>
    <div id="itemIs${cartItem}">
    <article class="totalOrderText">${item.item_name} - $ ${item.item_price}</article>
    <form method="DELETE">
    <button class="deleteButton${cartItem}">Delete</button>
    </form>
    <br>
    `;
    return cartItems;
  };

  let cartItems = [];

      // sends the total order in cart as text to twilioapi.js to use for the SMS
      const sendOrderText = function(text) {
        $.ajax("/twilio/usercart",{method: "POST", data: {ordertext : text}, success: () => {
          document.location.href="/thankyou";
        }});
      };
  //global variable to store order text
  let cartText = {};


  const loadMenuItems = function() {
    $.ajax("data",{method: "GET"})
      .then(function(data) {
        renderMenuItems(data);
        let cartItem = 0;
        let price  = 0;


        // add and render items to cart element
        $(".menu").on('submit', function(event) {
          event.preventDefault();
          // find item id
          let itemID = $(this).children('.item_id')[0].value;
          cartItem += 1;
          const renderCartItems = (data) => {

            const found = data.find(element => element.id == itemID);
            cartItems.push({id: itemID, price: found.item_price});
            let cart = createCartItem(found, cartItem);
            $('#cart-container').prepend(cart);

            cartText[itemID] = `${found.item_name.trim()} - $${found.item_price}`;
            //delete button
            $(`.deleteButton${cartItem}`).on('click', function(event) {
              event.preventDefault();
              $(`#itemIs${cartItem}`).remove();
              let index = cartItems.indexOf(found.id)
              cartItems.splice(index, 1);
              price -= found.item_price;
              cartItem -= 1;
              $('#order-total').text('Order Total:' + price);
              delete cartText[itemID];
            });

            price += found.item_price;
            $('#order-total').text('Order Total: $' + price);

          };
          renderCartItems(data);
        });

        //when submitting order, send text to twilio api
        // $("#order_items").on('submit', () => {
        //   // sendOrderText(Object.values(cartText).join(","));

        // });
      });
  };


   $("#order_items").on('submit', function(event) {
      event.preventDefault();
      let totalPrice = 0;
      cartItems.forEach((element) => {
          totalPrice += element.price
      })

      //sends data to db
      $.ajax({url:"/data", method: "POST", data: {totalPrice, cartItems},success: () => {
      }})
      sendOrderText(Object.values(cartText).join(","))
    })



  //load menu items to home page
  loadMenuItems();
});
