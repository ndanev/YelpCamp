const express = require('express');
const app = express();

// setup body-parser 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// use static file
app.use(express.static(__dirname + '/public'));


const Comments = require('./models/comment');
const Campground = require('./models/campground');

const seedDB = require('./seeds.js');
app.set('view engine', 'ejs');

// setup mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true });

seedDB();

// landing page (root path)
app.get('/', (req, res) => {
    res.render('landing');

});

//  display list of campgrounds 
app.get('/campgrounds', (req, res) => {

    Campground.find({}, function(error, allCampgrounds) {
        if(error) {
            console.log(error);
        } else {
            res.render('campgrounds/index', { campgrounds: allCampgrounds });
        }
    })

});

// post request --> add newe campgrounds to database
app.post('/campgrounds', (req, res) => {
    //get data from form
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description
    var newCampground = { name: name, image: image, description: description};
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
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

// show info about one dog
app.get('/campgrounds/:id', (req, res) => {
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

// ===============
// COMMENT ROUTES
// ===============
app.get('/campgrounds/:id/comments/new', (req, res) => {
    // find campground by id
    Campground.findById(req.params.id, (error, campground) => {
        if(error) {
            console.log(error);
        } else {
            res.render('comments/new', {campground: campground});
        }
    });

});

app.post('/campgrounds/:id/comments', (req, res) => {
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


// Listening on port 3000 
app.listen(3000, () => {
    console.log('YelpCamp server has started...');
});