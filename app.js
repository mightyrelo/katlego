//require('dot-env');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//connect instance of mongoose to db
const passport = require('passport');
require('./app_api/models/db_connection');
require('./app_api/config/passport');


const apiRouter = require('./app_api/routes/apIndex');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public', 'build')));
app.use(passport.initialize());

app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Origin', 'http://katlego.herokuapp.com');
  res.header('Access-Control-Allow-Headers', 'Origin, x-Requested-With,Content-Type, Accept, Authorization');
  next();
});

//app.use('/', indexRouter);
app.use('/api', apiRouter);
//if all incoming get requests fail to match routes in build folder, serve index file
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'app_public', 'build', 'index.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.use((err, req, res, next) => {
  if(err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({"message": err.name + ": " + err.message});
  }
});



module.exports = app;
