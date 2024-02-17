require('dotenv').config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const MongoStore = require('connect-mongo');

// Database connection
const url = "mongodb://localhost/pizza";
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const connection = mongoose.connection;

connection.on('error', (err) => {
    console.error('Database connection error:', err);
});

connection.once('open', () => {
    console.log('Database connected');
});

// Passport initialization
const passportInit = require('./app/config/passport')
passportInit(passport);

app.use(flash());

// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // Set cookie expiration to 1 day
    store: MongoStore.create({ mongoUrl: url, collectionName: 'sessions' }), // Use connect-mongo for session storage
}));

app.use(session({secret: process.env.COOKIE_SECRET}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/set-cookie', (req, res) => {
    // Set a cookie named 'myCookie' with value 'cookieValue' in the response header
    res.cookie('myCookie', 'cookieValue', { maxAge: 3600000, httpOnly: true });
    res.send('Cookie set successfully');
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
});

// Set up EJS and express-ejs-layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/resources/views'));

require('./routes/web')(app);

// Listen on the specified port
app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
