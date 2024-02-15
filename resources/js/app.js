import axios from 'axios'
import Noty from 'noty'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')
function updateCart(pizza){
    axios.post('/update-cart',pizza).then(res => {
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type:'success',
            timeout: 1000,
            text:'Item added to cart',
            progressBar: false,
        }).show();
    }).catch(err =>{
        new Noty({
            type:'error',
            timeout: 1000,
            text:'Something went wrong',
            progressBar: false,
        }).show();
    })
}

// addToCart.forEach((btn) => {
//     btn.addEventListener('click',(e) => {
//         let pizza = JSON.parse(btn.dataset.pizza)
//         updateCart(pizza)
//     })
// })
// Iterate over each button
addToCart.forEach((btn) => {
    // Flag to track whether the action has been triggered
    let actionTriggered = false;

    // Define a function to handle the click event
    const handleClick = (e) => {
        // Ensure that the action is executed only once
        if (!actionTriggered) {
            // Parse the pizza data from the button's dataset
            let pizza = JSON.parse(btn.dataset.pizza);

            // Update the cart
            updateCart(pizza);

            // Set the flag to indicate that the action has been triggered
            actionTriggered = true;
        }
    };

    // Add the click event listener to the button
    btn.addEventListener('click', handleClick);
});
