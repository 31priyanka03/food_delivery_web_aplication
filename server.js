const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const PORT = process.env.PORT || 3000;

app.use(express.static('public'))
app.get('/', function(req, res) {
    res.render('home');
});

// Set up EJS and express-ejs-layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Specify the views directory
app.set('views', path.join(__dirname, '/resources/views'));

// Listen on the specified port
app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
