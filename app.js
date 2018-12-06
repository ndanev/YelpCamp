const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const seedDB = require('./seeds.js');
const Comments = require('./models/comment');
const Campground = require('./models/campground');
const User = require('./models/user');


const app = express();


// setup body-parser 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

// setup mongoose
mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true });

// seedDB();

// express-session config
app.use(require('express-session')({
    secret: "This is my authentication for Yelp_Camp",
    resave: false,
    saveUninitialized: false
}));


// PASSPORT CONFIGURATION
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// use this function on every page (route) which allows me to use "currentUser" variable in every template
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

const commentRoutes = require('./routes/comments');
const campgroundRoutes = require('./routes/campgrounds');
const authRoutes = require('./routes/index');

app.use(authRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

// use static file
app.use(express.static(__dirname + '/public'));

// setup view engine
app.set('view engine', 'ejs');

// Listening on port 3000 
app.listen(3000, () => {
    console.log('YelpCamp server has started...');
});