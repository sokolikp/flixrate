angular.module('HRMDB.addmovie', [])

.controller('AddMovieController', function ($scope, Movie) {
  $scope.data = {};
  $scope.movieBody = false;
  $scope.spinner = false;
  $scope.notFound = false;

  $scope.addMovie = function(movie, year) {
    $scope.movie = '';
    $scope.year = '';
    $scope.movieData = {title: movie, year: year};
    $scope.movieBody = false;
    $scope.spinner = true;
    $scope.notFound = false;
    Movie.addMovie($scope.movieData).then(function(newMovie) {
      if(typeof newMovie === 'object') {
        $scope.data.movie = newMovie;
        $scope.movieBody = true;
      } else {
        $scope.notFound = true;
      }
      $scope.spinner = false;
    });
  };

});
