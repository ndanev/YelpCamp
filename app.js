const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const seedDB = require('./seeds.js');
const Comments = require('./models/comment');
const Campground = require('./models/campground');
const User = require('./models/user');

const app = express();

// setup mongoose
mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true });

// express-session config
app.use(require('express-session')({
    secret: "This is my authentication for Yelp_Camp",
    resave: false,
    saveUninitialized: true,

}));

// PASSPORT CONFIGURATION
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// setup body-parser 
app.use(bodyParser.urlencoded({ extended: true }));

// use static file
app.use(express.static(__dirname + '/public'));

// setup view engine
app.set('view engine', 'ejs');

seedDB();

// landing page (root path)
app.get('/', (req, res) => {
    res.render('landing');

});

//  display list of campgrounds 
app.get('/campgrounds', isLoggedIn, (req, res) => {

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

//=============
// AUTH ROUTES
//=============

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (error, user) => {
        if(error) {
            console.log(error);
            return res.render('register');
        }
        passport.authenticate('Local')(req, res, () => {
            res.redirect('/campgrounds');
        });
    });
});

// Login routes
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), (req, res) => {

});

// Logout route
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Listening on port 3000 
app.listen(3000, () => {
    console.log('YelpCamp server has started...');
});