angular.module('FlixRate', [
  'HRMDB.services',
  'HRMDB.addmovie',
  'HRMDB.movies',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/movies', {
      templateUrl: 'app/movies/movies.html',
      controller: 'MoviesController'
    })
    .when('/addmovie', {
      templateUrl: 'app/addmovie/addmovie.html',
      controller: 'AddMovieController'
    })
    .otherwise({
      redirectTo: '/movies'
    });

})
.run(function () {
});
