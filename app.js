var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors=require("cors")
const flash = require('express-flash')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const session = require("express-session");

var app = express();
app.enable('trust proxy')


var mongoose = require('mongoose');
const dev_db_url='mongodb+srv://schitini:Fabiolindo1@node-projects.zykqj.mongodb.net/TDD-API?retryWrites=true&w=majority'
var mongoDB =  dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors({credentials: true, origin:true}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/* app.use(session({
  secret: 'street',
  resave: true,
  saveUninitialized: true,
  proxy: true,
  cookie: {
      sameSite:'none',
      secure:true
  },
})); */

//app.use(flash())


app.use('/', indexRouter);
app.use('/users', usersRouter);



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
