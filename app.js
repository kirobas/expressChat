var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var mustacheExpress = require('mustache-express');

var routes = require('./routes/index');
var users = require('./routes/users');
var user = require('./routes/user');
var login = require('./routes/login');

var app = express();

// view engine setup
// app.set('view engine', 'jade');

app.engine('html', mustacheExpress());          // register file extension mustache
app.set('view engine', 'html');                 // register file extension for partials
// app.set('views', __dirname + '/html');
app.set('views', path.join(__dirname, 'views'));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

// app.use(express.static(__dirname + '/public')); // set static folder

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/user', user);
app.use('/login', login);

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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port ' + (process.env.PORT || 3000));
});

//  fs.readFile(process.argv[2], 'utf8', function(error, data) {
//     if (error) {
//         console.log('Could not find or open file ' + process.argv[2] + ' for reading\n');
//     } else {
//         console.log(data.split('\n').length - 1);
//     }
// });
