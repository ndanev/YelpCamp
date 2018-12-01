const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// var express = require('express');
// var router = express.Router();
// var passport = require('passport');
// var User = require('../models/user');


// landing page (root path)
router.get('/', (req, res) => {
    res.render('landing');

});

// Register routes
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {

    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (error, user) => {
        if(error) {
            console.log(error);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/campgrounds');
        });
    });
});

// Login routes
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), (req, res) => {

});

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;