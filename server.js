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

var configDB = require('./config/database.js');
mongoose.connect(configDB.url); // connect to our database

// initialize our app
var app = express();

// app configuation
app.set('view engine', 'ejs'); // set up ejs for templating
app.set('views', __dirname+'/views');
app.use(express.static(__dirname+'/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(morgan('dev'));
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'keyboard-cat' }));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(function (req,res,next) {
	res.locals.currentUser = req.user;
	next();
});


require('./config/passport')(passport); // pass passport for configuration


var routes = require('./routes/welcome.js');

var User = require("./models/user");

app.use('/', routes);


app.listen(port);
console.log('Express server listening on port '+port);

module.exports = app;
