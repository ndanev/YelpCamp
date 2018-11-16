const express = require('express');
const app = express();

app.set('view engine', 'ejs');


// landing page (root path)
app.get('/', (req, res) => {
    res.render('landing');

});

// campgrounds page
app.get('/campgrounds', (req, res) => {
    let campgrounds = [
        {name:"Salmon Creek", image:"https://images.pexels.com/photos/1309586/pexels-photo-1309586.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
        {name:"Granite Hill", image:"https://images.pexels.com/photos/1309584/pexels-photo-1309584.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
        {name:"Mountain Goat's Rest", image:"https://images.pexels.com/photos/756780/pexels-photo-756780.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
    ];
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.listen(3000, () => {
    console.log('YelpCamp server has started...');
});