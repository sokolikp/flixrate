var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
 upvotes: Number,
 downvotes: Number,
 poster: String, 
 plot: String,
 year: Number,
 genre: String,
 title: String,
 director: String,
 writer: String,
 actors: String,
 IMDBscore: Number,
 IMDBvotes: Number
});

module.exports = mongoose.model('Movie', MovieSchema);