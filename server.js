const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const PORT = process.env.PORT || 3000;

app.use(express.static('public'))

// Set up EJS and express-ejs-layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Specify the views directory
app.set('views', path.join(__dirname, '/resources/views'));

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/cart',function(req,res){
    res.render('customers/cart')
});

app.get('/login',function(req,res){
    res.render('auth/login')
});

app.get('/register',function(req,res){
    res.render('auth/register')
});

// Listen on the specified port
app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
