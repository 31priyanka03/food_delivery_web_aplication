import axios from 'axios'
import Noty from 'noty'
import  initAdmin  from './admin'
import moment from 'moment'

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

const alertMsg = document.querySelector('#success-alert')
if(alertMsg){
    setTimeout(() =>{
        alertMsg.remove()
    },2000)
}

initAdmin()

//change order status
let statuses = document.querySelectorAll('.status_line')
// console.log(statuses)
let order = document.querySelector('#hiddenInput')? document.querySelector('#hiddenInput'). value:null
order = JSON.parse(order)
// console.log(order)
let time = document.createElement('small')


function updateStatus(order){
    statuses.forEach((status) =>{
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) =>{
        let dataProp = status.dataset.status
        if(stepCompleted){
            status.classList.add('step-completed')
        }
        if(dataProp === order.status){
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
            if(status.nextElementSibling){
            status.nextElementSibling.classList.add('current')
            }
        }
    })
}
updateStatus(order);

//Socket
let socket = io()
if(order){
    socket.emit('join',`order_${order._id}`)
}
let adminAreaPath = window.location.pathname
if(adminAreaPath.includes('admin')){
    socket.emit('join','adminRoom')
}

socket.on('orderUpdated',(data) =>{
    const updatedOrder = {...order}
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    updateStatus(updatedOrder)
    new Noty({
        type:'success',
        timeout: 1000,
        text:'Order Updated',
        progressBar: false,
    }).show();
    // console.log(data)
})