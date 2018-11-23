const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comments = require('./models/comment');

let data = [
    {
        name: "Brightly Rest",
        image: "https://images.pexels.com/photos/1539225/pexels-photo-1539225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        description: " One more nice place for rest..."
    },
    {
        name: "Blue Camp",
        image: "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        description: " One more nice place for rest..."
    },
    {
        name: "Yellow Camp",
        image: "https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        description: " One more nice place for rest..."
    }
]

seedDB = () => {
    // remove all campgrounds
    Campground.deleteMany({}, (error) => {
        if (error) {
            console.log(error);
        }
        // add a few campgrounds
        data.forEach((seed) => {
            Campground.create(seed, (error, campground) => {
                if (error) {
                    console.log(error);
                } else {
                    Comments.create({
                        text: "This place is good but I dont have a internet",
                        author: "Homer"
                    }, (error, comment) => {
                        if(error) {
                            console.log(error);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("created a new comment");
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;
