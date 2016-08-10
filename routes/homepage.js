var express = require('express');
var router = express.Router();
var passport = require("passport");
var User= require("../models/user");
var Post = require("../models/post");


router.get('/', isLoggedIn, function(req, res, next) {

  Post.find({},{}, function(err, posts){
      if(err){
        console.log(err);
      }else{

         res.render('homepage', {"posts": posts} );
      }
	});

});

router.post('/add', isLoggedIn, function(req ,res, next){

  var main = req.body.main;
  var username = req.user.username;

  var newPost = {
    main : main,
    time : new Date().getTime(),
    username : username,
    comments : [],
    likes : []
  }

  Post.create(newPost, function(err, post){
    if(err){
      console.log(err);
    }else{
      res.redirect("/homepage");

    }
  });

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
