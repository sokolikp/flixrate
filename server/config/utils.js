var request = require('request'),
    Q       = require('q');


module.exports = {
  getMovieData: function(movieData) {
    var movieRequest = 'https://www.omdbapi.com/?t=' + movieData.title + '&y=' + movieData.year  + '&plot=short&r=json';
    request(movieRequest, function(err, res, html) {
      if (err) {
        return console.log(err);
      } else {
        // console.log('getting movie data', html);
        return html;
      }
    });
  }

};

