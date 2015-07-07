angular.module('HRMDB.movies', [])

.controller('MoviesController', function ($scope, Movies) {
  $scope.showMovies = false;
  $scope.data = {};
  $scope.showPlot = false;

  $scope.getMovies = function() {
    Movies.getMovies().then(function(movies) {
      Movies.getComments().then(function(comments) {
        for(var i=0; i<movies.length; i++) {
          movies[i].comments = [];
          for(var j=0; j<comments.length; j++) {
            if(movies[i]._id === comments[j].movieID) {
              movies[i].comments.push(comments[j].comment);
            }
          }
        }
        $scope.data.movies = movies;
        $scope.showMovies = true;
      });
    });
  };

  $scope.postComment = function(movie, comment) {
    $scope.comment = '';
    Movies.postComment({movie: movie, comment: comment}).then(function(data) {
      $scope.getMovies();
    });
  };

  $scope.showplot = function() {
    $scope.showPlot = !$scope.showPlot;
  };

  $scope.upvote = function(movie) {
    Movies.upvote(movie).then(function(data) {
      $scope.getMovies();
    });
  };

  $scope.downvote = function(movie) {
    Movies.downvote(movie).then(function(data) {
      $scope.getMovies();
    });
  };

  $scope.getMovies();
});
