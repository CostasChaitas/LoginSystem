// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var postSchema = mongoose.Schema({
    main: String,
    username : String,
    time : String,
    comments : Array,
    like : Array
});

// create the model for posts and expose it to our app
module.exports = mongoose.model('Post', postSchema);
