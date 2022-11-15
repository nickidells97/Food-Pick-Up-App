$(document).ready(function() {


 const ordersCardContructor = (obj)=> {

  let orders = `
    <section class = "user-orders">
    <div id="target"> Click Here</div>
      <div class = "order-card-header">
        <div class = "order-acceptance">
          <form>   
          <div class="order-status"> 
            <input type="submit" name="accept" value="Accept" class="order-status">
            <input type="submit" name="decline" value="Reject">
            <input type="submit" name="completed" value="Completed">
          </div>
            </form>
        <div class = "order-details">
        <h5>Order Details</h5>  
        <p> Customer name: ${obj.user_name}</p>
          <p>Order Date: 11/13/2022</p>
          <p> Order Item: ${obj.name}</p>
          <p id ="total">Total: ${obj.item_price}</p>
          <h5>Customer Contact Details</h5>
          <p>Email: ${obj.email}</p>
          <p>Phone: ${obj.phone}</p>

        </div>
    </section>
  `;
  return orders
  };

  const renderOrderCards = (data)=> {
    data.forEach((x)=> {
      let orders = ordersCardContructor(x);
      $('#restaurant-orders').append(orders);
    });
    
  };
  
  const loadOrders = function() {
    $.ajax("/restaurants/orders",{method: "GET"})
    .then(function(data) {
      // console.log(data);
      renderOrderCards(data);
      
      // Attach listener
      $( "#target" ).on( "click", function() {
        alert( $( this ).text() );
      });
      


      });
  };

  loadOrders();


  $("#total").click((event)=> {
    console.log("I was clicked");

    event.preventDefault(); // Prevent default action on button click
  });



});