var movieController = require('./movieController.js');

module.exports = function (app) {

  app.post('/addmovie', movieController.addMovie);
  app.get('/movies', movieController.getMovies);
  app.post('/movies/upvote', movieController.upvote);
  app.post('/movies/downvote', movieController.downvote);
  app.post('/movies/comment', movieController.postComment);
  app.get('/movies/comment', movieController.getComments);
};

