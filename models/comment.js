const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let commentSchema = new mongoose.Schema({
    text: String,
    author: String
});

let Comments = mongoose.model('Comments', commentSchema);

module.exports = Comments;