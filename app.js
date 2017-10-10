var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

var config = require('./config/loader');
var googleStrategy = require('./passport/google');
var todos = require('./routes/todos');
var auth = require('./routes/auth');

var app = express();

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

passport.use(googleStrategy);
app.use(passport.initialize());

app.use('/api/todos', todos);
app.use('/auth', auth);

module.exports = app;
