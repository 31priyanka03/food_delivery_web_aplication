const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartContollers');
const orderController = require('../app/http/controllers/customers/orderController');
const homeController = require('../app/http/controllers/homeController')
const AdminOrderController = require('../app/http/controllers/admin/orderController');
const guest = require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')
const admin = require('../app/http/middleware/admin')

function initRoutes(app){

    app.get('/',homeController().index )

    app.get('/cart',cartController().index)
    
    app.get('/login',guest,authController().login)
    app.post('/login',authController().postLogin)
    app.get('/register',guest,authController().register)
    app.post('/register',authController().postRegister)
    app.post('/logout',authController().logout)

    app.post('/update-cart', cartController().update)
//Customer routes
    app.post('/orders', orderController().store)
    app.get('/customer/orders', orderController().index)
///admin routes
    app.get('/admin/orders',admin, AdminOrderController().index)
}

module.exports = initRoutes;