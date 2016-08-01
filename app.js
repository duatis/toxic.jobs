var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    routes = require('./routes/index'),
    api = require('./routes/api.js'),
    index = require('./routes/index.js'),
    account = require('./routes/account.js'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    app = express(),
    Account = require('./models/account');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static( './public'));
app.use(require('express-session')({
    secret: 'toxic jobs',
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false }
}));
//config passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', api);
app.use('/account', account);
app.use('/', index);

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Account.findById(id, function (err, user) {
        done(err, user);
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error' + err.message);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('error' + err.message);
});


module.exports = app;
