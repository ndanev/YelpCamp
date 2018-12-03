const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
// var express = require('express');
// var router = express.Router();
// var Campground = require('../models/campground');

//  display list of campgrounds 
router.get('/campgrounds', (req, res) => {

    Campground.find({}, function(error, allCampgrounds) {
        if(error) {
            console.log(error);
        } else {
            res.render('campgrounds/index', { campgrounds: allCampgrounds});
        }
    })

});

// post request --> add newe campgrounds to database
router.post('/campgrounds',isLoggedIn, (req, res) => {
    //get data from form
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = { name: name, image: image, description: description, author: author};
    // Create new campground and save to the database
    Campground.create(newCampground, (error, newlyCreated) => {
        if(error) {
            console.log(error);
        } else {
            //redirect to campground page
            res.redirect('/campgrounds');
        }
    });
});

// show the form to create new campgrounds 
router.get('/campgrounds/new',isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
});

// show info about one campground
router.get('/campgrounds/:id', (req, res) => {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec((error, foundCampground) => {
        if(error) {
            console.log(error);
        } else {
            // render show tamplate with that campground
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });

});

//middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;