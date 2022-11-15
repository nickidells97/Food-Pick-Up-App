// $(document).ready(() => {
  

//   const createMenuItem = () => {
//     return `<div class="menu-item">
//     <input type="checkbox">
//     <h5> Food!</h1>
//       <img src="https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" width="200" height="200">
//       <span> Description can go here </span>
//       <span> Price: </span>
//     </div>`
//   }

//   const loadOrders = function() {
//     $.ajax("/restaurants/routes/data",{method: "GET"})
//       .then(function(data) {
//         // console.log(data);
//         renderOrderCards(data);
//       });
//   };

//   loadOrders();

//   const renderMenuItems = () => {
//     $('#menu-container').prepend(createMenuItem());
//   }

//   renderMenuItems();

// })
