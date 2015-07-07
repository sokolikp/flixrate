angular.module('HRMDB.services', [])

.factory('Movie', function ($http) {
  return {
    addMovie: function(movieData){
      return $http({
        method: 'POST',
        url: '/addmovie', 
        data: movieData
      })
      .then(function (resp) {
        return resp.data;
      });
    }

  }
})

.factory('Movies', function ($http) {

var movieFunctions = 
{
    getMovies: function(){
      return $http({
        method: 'GET',
        url: '/movies'
      })
      .then(function (resp) {
        // var movies = resp.data;
        // var comments = movieFunctions.getComments();
        // console.log('Getting comments is asyn:', comments);
        return resp.data;
      });
    },

    upvote: function(movieData) {
      return $http({
        method: 'POST',
        url: '/movies/upvote', 
        data: movieData
      });
    },

    downvote: function(movieData) {
      return $http({
        method: 'POST',
        url: '/movies/downvote', 
        data: movieData
      });
    },

    postComment: function(movieData) {
      return $http({
        method: 'POST',
        url: '/movies/comment', 
        data: movieData
      });
    },

    getComments: function() {
      return $http({
        method: 'GET',
        url: '/movies/comment', 
      })
      .then(function (resp) {
        return resp.data;
      });

    }
  };

  return movieFunctions;
});



