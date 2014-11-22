var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

// This tells node how to parse POST parameters.
app.use(bodyParser.urlencoded());

// Sets the rendering engine in node to be embedded javascript.
app.set('view engine', 'ejs');

/*
 * Here we connect as a demo user to our demo database. If you want control
 * over your Llo's data, you can create your own database for free at 
 * mongolab.com. Then, mongolab will give you a seperate URL to connect to.
 */
mongoose.connect('mongodb://user:abc123@ds053130.mongolab.com:53130/llo');

// A schema is like a contract of how we will represent a post in our database.
var PostSchema = mongoose.Schema({
  content: String,
});

/*
 * A model is the API for a mongoose schema. A schema defines how the data is
 * structured. A model lets us interact with the data. With a model we can
 * query and save data to our database.
 */
var Post = mongoose.model('Post', PostSchema);

// Defines the actions we take when the user hits our main page.
app.get('/', function (req, res) {
  /*
   * Searches through our database for all Post objects that  match our query.
   *
   */
  Post.find({}, function(err, posts) {
    res.render('home', {posts: posts});
  })
})

// Defines the actions we take when the user submits a post 
app.post('/submit', function (req, res) {
  var content = req.body.content;
  var newPost = new Post({
    content : content,
  });
  newPost.save();
  res.send("thank you for creating desperately needed content for us!");
})

var port = 3000;
var server = app.listen(port, function () {
  console.log('Llo listening at http://%s:%s', 'localhost', port)
})