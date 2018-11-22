const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

let Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;