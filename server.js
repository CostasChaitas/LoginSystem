// required modules
var express = require('express');
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var flash    = require('connect-flash');
var path = require('path');
var moment = require('moment');

var configDB = require('./config/database.js');
mongoose.connect(configDB.url); // connect to our database

var routes = require('./routes/welcome.js');
var homepage = require('./routes/homepage.js');
var userpage = require('./routes/userpage.js');

var User = require("./models/user");
var Post = require("./models/post");

// initialize our app
var app = express();

// app configuation
app.set('view engine', 'ejs'); // set up ejs for templating
app.set('views', __dirname+'/views');
app.use(express.static(__dirname+'/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // get information from html forms
app.use(cookieParser());
app.use(session({
	secret: 'keyboard-cat',
	resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(function (req,res,next) {
	res.locals.currentUser = req.user;
	app.locals.moment = moment;
	next();
});

require('./config/passport')(passport); // pass passport for configuration

app.use('/', routes);
app.use('/homepage', homepage);
app.use('/userpage', userpage);

app.listen(port);
console.log('Express server listening on port '+port);

module.exports = app;
