const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments"
        }
    ] 
});

let Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;