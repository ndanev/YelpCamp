const express = require('express');
const app = express();

// setup mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yelp_camp');

// setup body-parser 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');


let campgrounds = [
    {name:"Salmon Creek", image:"https://images.pexels.com/photos/1309586/pexels-photo-1309586.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
    {name:"Granite Hill", image:"https://images.pexels.com/photos/1309584/pexels-photo-1309584.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
    {name:"Mountain Goat's Rest", image:"https://images.pexels.com/photos/878251/pexels-photo-878251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
    {name:"Salmon Creek", image:"https://images.pexels.com/photos/1309586/pexels-photo-1309586.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
    {name:"Granite Hill", image:"https://images.pexels.com/photos/1309584/pexels-photo-1309584.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
    {name:"Mountain Goat's Rest", image:"https://images.pexels.com/photos/878251/pexels-photo-878251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
    {name:"Salmon Creek", image:"https://images.pexels.com/photos/1309586/pexels-photo-1309586.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
    {name:"Granite Hill", image:"https://images.pexels.com/photos/1309584/pexels-photo-1309584.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
    {name:"Mountain Goat's Rest", image:"https://images.pexels.com/photos/878251/pexels-photo-878251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
];


// landing page (root path)
app.get('/', (req, res) => {
    res.render('landing');

});

// campgrounds page
app.get('/campgrounds', (req, res) => {

    res.render('campgrounds', {campgrounds: campgrounds});
});

// post request --> create new campgrounds
app.post('/campgrounds', (req, res) => {
    //get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    //redirect to campground page
    res.redirect('/campgrounds');
    
});

// show the form where we send data to post route 
app.get('/campgrounds/new', (req, res) => {
    res.render('new');
});

app.listen(3000, () => {
    console.log('YelpCamp server has started...');
});