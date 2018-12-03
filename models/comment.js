const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

let Comments = mongoose.model('Comments', commentSchema);

module.exports = Comments;