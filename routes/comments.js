const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require('../models/campground');
const Comments = require('../models/comment');

// var express = require('express');
// var router = express.Router();
// var Campground = require('../models/campground');
// var Comments = require('../models/comment');

router.get('/campgrounds/:id/comments/new',isLoggedIn, (req, res) => {
    // find campground by id
    Campground.findById(req.params.id, (error, campground) => {
        if(error) {
            console.log(error);
        } else {
            res.render('comments/new', {campground: campground});
        }
    });

});

router.post('/campgrounds/:id/comments',isLoggedIn, (req, res) => {
    // lookup campground using id
    Campground.findById(req.params.id, (error, campground) => {
        if(error) {
            console.log(error);
            res.redirect('/campgrounds');
        } else {
            // create a new comment
            Comments.create(req.body.comment, (error, comment) => {
                if(error) {
                    console.log(error);
                } else {
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    // redirect campground show page 
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
                  
        }

    });

});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;