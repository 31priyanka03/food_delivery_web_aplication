import axios from 'axios'
import Noty from 'noty'

export function placeOrder(formObject){
    axios.post('/orders',formObject).then ((res) =>{
        new Noty({
            type:'success',
            timeout: 1000,
            text: res.data.message,
            progressBar: false,
        }).show();
            window.location.href = '/customer/orders';
    }).catch((err) =>{
        new Noty({
            type:'error',
            timeout: 1000,
            text: err.res.data.message,
            progressBar: false,
        }).show();
    })
    console.log(formObject)
}