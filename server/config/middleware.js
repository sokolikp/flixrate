var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser');

module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  var movieRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  app.use('/', movieRouter); 
 
  // inject our routers into their respective route files
  require('../movies/movieRoutes.js')(movieRouter);
};

