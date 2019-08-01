const AuthenticationController = require('./controllers/AuthenticationController');
const TestController = require('./controllers/TestController');
const passport = require('passport');
const passportService = require('./passport');

passport.use('jwt', passportService.jwtLogin);

const isAuthenticated = passport.authenticate('jwt', { session: false });

module.exports = app => {
  app.get('/tests', isAuthenticated, TestController.index);
  app.post('/tests/access', isAuthenticated, TestController.access);
  app.get('/tests/:testId', isAuthenticated, TestController.show);
  app.post('/tests', isAuthenticated, TestController.post);

  app.post('/register', AuthenticationController.register);
  app.post('/login', AuthenticationController.login);
  app.get('/getuser', isAuthenticated, AuthenticationController.getuser);
};