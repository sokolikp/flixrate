var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
 movieID: String,
 comment: String
});

module.exports = mongoose.model('Comment', CommentSchema);