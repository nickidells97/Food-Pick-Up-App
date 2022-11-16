$(document).ready(() => {
  

  const createMenuItem = (obj) => {

    const menu =  `
    <form method="POST" action="/usercart">
            <div>
              <h5> ${obj.item_name}!</h1>
      <img src="https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" width="200" height="200">
      <span> ${obj.item_description} </span>
      <span> Price: ${obj.item_price} </span>
              <button type="submit">Add to cart</button>
            </div>
          </form>
    `;
    return menu
  };

  const renderMenuItems = (data) => {
      for(const item of data){
        let menu = createMenuItem(item);
        
        $('#menu-container').prepend(menu);
      }
  }

  const loadMenuItems = function() {
         $.ajax("data",{method: "GET"})
           .then(function(data) {
             renderMenuItems(data);
           });
       };
  
       loadMenuItems();
})

