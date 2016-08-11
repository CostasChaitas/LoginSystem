var express = require('express');
var router = express.Router();
var passport = require("passport");
var asyncc = require("async");
var User= require("../models/user");
var Post = require("../models/post");



router.get('/', isLoggedIn, function(req, res, next) {

  asyncc.parallel([

  function(callback){

    Post.find({},{}, function(err, posts){
        if(err){
          console.log(err);
        }else{

           callback(null, posts);
        }
    });
  },

  function(callback){
       User.find({},{}, function(err, users){
        if(err){
          console.log(err);
        }else{
            callback(null, users);
        }
      });
  }
  ],
  function(err, results){
          // res.send(results);
          res.render('homepage', {
              "posts": results[0],
              "users": results[1]
          });
  });




});

router.post('/add', isLoggedIn, function(req ,res, next){

  var main = req.body.main;
  var username = req.user.username;

  var newPost = {
    main : main,
    time : new Date(),
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
