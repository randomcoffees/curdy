const bodyParser = require('body-parser');

module.exports = function(app) {
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());

  app.use('/helloWorld', require('./controllers/helloWorld'));
  app.use('/simpleModel', require('./controllers/simpleModel'));
  app.use('/simpleModelWithRouteParams', require('./controllers/simpleModelWithRouteParams'));
  app.use('/plugins', require('./controllers/plugins'));
};