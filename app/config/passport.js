const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')
const session = require('express-session');
const express = require("express");
const app = express();

function init(passport){
    app.use(session({
        secret: process.env.COOKIE_SECRET, // Replace with your secret key
        resave: false,
        saveUninitialized: false
    }));


    passport.use(new LocalStrategy({usernameField:'email'},async (email,password,done) =>{

        const user = await User.findOne({email:email})
        if(!user){
            return done(null,false,{message:'No user with this email'})
        }
        bcrypt.compare(password,user.password).then(match =>{
            if(match){
                return done(null,user,{message:'Successfully Logged'})
            }
            return done(null,false,{message:'Wrong username or password'})
        }).catch(err =>{
            return done(nul,false,{message:'Something went wrong'})
        })
    }))
    passport.serializeUser((user,done) =>{
        done(null,user._id)
    })
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
    
}
module.exports = init