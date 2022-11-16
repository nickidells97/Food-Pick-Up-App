$(document).ready(() => {

  $("#order_items").on('submit', function(event) {
    event.preventDefault();
    const cartItems = (req) => {

    }
    console.log()
    const loadMenuItems = function() {
        $.ajax("/data",{method: "POST", })
          .then(function(data) {

          })
      }

  })




})

