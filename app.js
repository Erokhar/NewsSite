var createError = require('http-errors');
var express = require('express');
const sessions = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userSigninRouter = require('./routes/userSignIn')
var userLoginRouter = require('./routes/userLogin')
var userProfileRouter = require('./routes/userProfile')
var newsInputRouter = require('./routes/newsInput')
var newsViewRouter = require('./routes/newsView')

var app = express();
app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:true,
  resave: false,
  userid:String
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public",express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', userSigninRouter);
app.use('/users', userLoginRouter);
app.use('/users', userProfileRouter);
app.use('/news', newsInputRouter);
app.use('/news', newsViewRouter);


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


module.exports = app;
