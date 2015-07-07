var Movie    = require('./movieModel.js'),
    Comment  = require('./commentModel.js'),
    Q        = require('q'),
    request  = require('request'),
    util     = require('../config/utils.js');


module.exports = {

  getMovies: function (req, res, next) {
    Movie.find().exec(function(err, movies) {
      if(movies) {
        res.status(200).send(movies);
        // module.exports.getComments();
      }
      else {
        res.end('Nothing found');
      }
    });
  },

  addMovie: function (req, res, next) {
    var title = req.body.title;
    var year = req.body.year;
    console.log('Year & Title:', year, title);
    Movie.findOne({title: title, year: year}).exec(function(err, movie) {
      if(movie) {
        console.log('Found it!', movie);
        res.status(200).send(movie);
      }
      else {
        console.log('making API request');
        var movieRequest = 'http://www.omdbapi.com/?t=' + req.body.title + '&y=' + req.body.year  + '&plot=short&r=json';
        request(movieRequest, function(err, REQres, html) {
          if (err) {
            console.log(err);
          } else {
            var movieEntry = JSON.parse(html);
            if(movieEntry.Title !== undefined) {
              console.log('Hey, I found a movie: ', typeof movieEntry);
              var newMovie = new Movie({
                upvotes: 0,
                downvotes: 0,
                poster: movieEntry.Poster, 
                plot: movieEntry.Plot,
                year: movieEntry.Year,
                genre: movieEntry.Genre,
                title: movieEntry.Title,
                director: movieEntry.Director,
                writer: movieEntry.Writer,
                actors: movieEntry.Actors,
                IMDBscore: movieEntry.imdbRating,
                IMDBvotes: movieEntry.imdbVotes
              });
              newMovie.save(function(err, entry) {
                if(err) {
                  // console.log('I almost saved, but i have a 500 error');
                  res.send(500,err);
                }
                else {
                  console.log('Im right here! Sending back to client', entry);
                  res.json(entry);
                } 
              });
            } else {
              console.log('nothing found');
              res.send(200);              
            }
          }
        });
      }
    });
  },

  upvote: function (req, res, next) {
    console.log('(up) Routed by the server with movie object:', req.body);
    Movie.findOne({_id:req.body._id}).exec(function(err, movie) {
      if(movie) {
        console.log('found the movie');
        movie.upvotes++;
        movie.save(function(err,entry) {
          if(err) return console.log(err);
          res.sendStatus(200);
        });
      } else {
        console.log('I didnt find that movie for some reason');
        res.sendStatus(500);
      }
    });
  },

  downvote: function (req, res, next) {
    console.log('(down) Routed by the server with movie object:', req.body.plot);
    Movie.findOne({_id:req.body._id}).exec(function(err, movie) {
      if(movie) {
        console.log('found the movie');
        movie.downvotes++;
        movie.save(function(err,entry) {
          if(err) return console.log(err);
          res.sendStatus(200);
        });
      } else {
        console.log('I didnt find that movie for some reason');
        res.sendStatus(500);
      }
    });
  },

  postComment: function (req, res, next) {
    console.log('Commenting on movie object:', req.body.movie);
    Movie.findOne({_id:req.body.movie._id}).exec(function(err, movie) {
      if(movie) {
        console.log('Found the commenting movie', movie._id);
        var comment = new Comment({movieID: movie._id, comment: req.body.comment});
        comment.save(function(err, entry) {
          if(err) {
            res.send(500, err);
          }
          else {
            console.log('Comment saved!');
            res.sendStatus(200);
          }
        });
      } else {
        console.log('I didnt find that movie for some reason');
        res.sendStatus(500);
      }
    });
  },

  getComments: function (req, res, next) {
    console.log('Getting comments');
    Comment.find().exec(function(err, comments) {
      if(comments) {
        res.status(200).send(comments);
      } else {
        console.log('I didnt find any comments');
        res.sendStatus(500);
      }
    });
  }  

};


