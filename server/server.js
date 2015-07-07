  var express     = require('express'),
      mongoose    = require('mongoose');

var app = express();

mongoURI = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/HRMDB';

mongoose.connect(mongoURI); // connect to mongo database named HRMDB

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});

// configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express);

// export our app for testing and flexibility, required by index.js
module.exports = app;

