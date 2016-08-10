var express = require('express');
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('welcome.ejs');
});

router.get('/register', function(req, res) {
    res.render('register.ejs');
});

// app.post('/signup', do all our passport stuff here);
router.post('/register', passport.authenticate('signup',{
    successRedirect: "/",
    failureRedirect: "/register",

}));

router.get('/login', function(req, res) {
    res.render('login.ejs');
});

router.post('/login', passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
}));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;
