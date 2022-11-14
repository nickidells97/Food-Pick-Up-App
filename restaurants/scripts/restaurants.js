$(document).ready(function() {



 const ordersCardContructor = (obj)=> {

  let orders = `
    <section class = "user-orders">
      <div class = "order-card-header">
        <div class = "order-acceptance">
          <form>
            <button class = "accept">Accept</button>
            <button class = "reject">Reject</button>
          </form>
        </div>
        <div class = "order-duration">20</div>
        </div>
        <div class = "order-details">
        <h5>Order Details</h5>  
        <p> Customer name: ${obj.user_name}</p>
          <p>Order Date: 11/13/2022</p>
          <p> Order Item: ${obj.name}</p>
          <p>Total Bill: ${obj.item_price}</p>
          <h5>Customer Contact Details</h5>
          <p>Email: ${obj.email}</p>
          <p>Phone: ${obj.phone}</p>

        </div>
    </section>
  `;
  return orders
  };

  const renderOrderCards = (data)=> {
  let orders = ordersCardContructor(data);

  $('#restaurant-orders').append(orders);
  };

  const loadOrders = function() {
    $.ajax("/restaurants/routes/data",{method: "GET"})
      .then(function(data) {
        // console.log(data);
        renderOrderCards(data);
      });
  };

  loadOrders();

});