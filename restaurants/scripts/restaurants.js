$(document).ready(function() {


 const ordersCardContructor = (obj)=> {

  // Line 10 to make API call to user notifying them if order is ready

  let orders = `
    <section class = "user-orders}">
      <div class = "order-card-header">
        <div class = "order-acceptance">
          <form>   
            <input type="submit" name="completed" value="Completed">
          </form>
          <span>Time Elapsed</span> <span class ="duration">${obj.duration} </span>
        </div>
        <div class = "order-details">
        <h5>Order Details</h5>  
        <p> Customer name: ${obj.user_name}</p>
          <p>Order Date: 11/13/2022</p>
          <p> Order Item: ${obj.name}</p>
          <p>Total: ${obj.item_price}</p>
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

      timeElapsed();


      // const durationArray = $('span.duration').get();
      // console.log(durationArray[0].innerHTML);

    

      // Attach listener
      $( ".order-acceptance" ).on( "click", (event)=> {
        event.preventDefault();
        
        // To send sms
        
      });
      
      
    });
  };
  
  loadOrders();
  
  const timeElapsed = ()=> {

    const durationArray = $('span.duration').get();

    for(let i=0; i < durationArray.length; i++){
      console.log( durationArray[i].innerHTML);
      
      
      
      let duration = durationArray[i].innerHTML;
      let countdown = 1;
      
      let timer = 60000;
      
      const interval = setInterval(()=> {
        console.log(countdown);
        durationArray[i].innerHTML = duration - countdown;
        countdown++;
        
        if(countdown > duration) { //stops interval
          clearInterval(interval);
        }
      }, timer);
      
    }
    
    };
    // console.log($('span').get(1));

    
  

});