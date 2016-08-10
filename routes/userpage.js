var express = require('express');
var router = express.Router();
var passport = require("passport");
var multerMiddleware = require("../middlewares/multer");

var User= require("../models/user");
var Post = require("../models/post");


router.get('/:id', isLoggedIn, function(req, res, next) {

  if(req.params.id == req.user._id){
    res.render("profilepage.ejs")
  }else{
    res.render("userpage.ejs")
  }
});

router.post('/addFoto', isLoggedIn, multerMiddleware.single('profileImage'), function(req, res, next) {

  var id = req.user.id;
  var profileImage = "noimage.png";

  if(typeof req.file !== "undefined") {
      profileImage = req.file['filename'] ;
  }

  User.findOne({"_id":id }, function(err, user){
      if(err){
        console.log(err);
      }else{
        user.image = profileImage;

        user.save(function(err){
          if(err){
            console.log("Not updated");
          }else{
            console.log("updated");
          }
        });
      }
  });
  
  res.render("homepage.ejs");
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
