const express = require('express');
const app = express();

// setup body-parser 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');


const Comments = require('./models/comment');
const Campground = require('./models/campground');

const seedDB = require('./seeds');

// setup mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true });

seedDB();


//     Campground.create(

//         {
//             name: "Granite Hill",
//             image: "https://images.pexels.com/photos/1309584/pexels-photo-1309584.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//             description: "This is huge campground. No bathrooms, no water. Beautiful granite"
//         }, function (error, campground) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log('created new campground');
//                 console.log(campground);
//             }
//         }
//     );



// let campgrounds = [
//     { name: "Salmon Creek", image: "https://images.pexels.com/photos/1309586/pexels-photo-1309586.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
//     { name: "Granite Hill", image: "https://images.pexels.com/photos/1309584/pexels-photo-1309584.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
//     { name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/878251/pexels-photo-878251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
//     { name: "Salmon Creek", image: "https://images.pexels.com/photos/1309586/pexels-photo-1309586.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
//     { name: "Granite Hill", image: "https://images.pexels.com/photos/1309584/pexels-photo-1309584.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
//     { name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/878251/pexels-photo-878251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
//     { name: "Salmon Creek", image: "https://images.pexels.com/photos/1309586/pexels-photo-1309586.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
//     { name: "Granite Hill", image: "https://images.pexels.com/photos/1309584/pexels-photo-1309584.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
//     { name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/878251/pexels-photo-878251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" }
// ];


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
            res.render('index', { campgrounds: allCampgrounds });
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
    res.render('new');
});

// show info about one dog
app.get('/campgrounds/:id', (req, res) => {
    // find the campground with provided ID
    Campground.findById(req.params.id, function(error, foundCampground) {
        if(error) {
            console.log(error);
        } else {
            // render show tamplate with that campground
            res.render('show', {campground: foundCampground});
        }
    });

});


// Listening on port 3000 
app.listen(3000, () => {
    console.log('YelpCamp server has started...');
});