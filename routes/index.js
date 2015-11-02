  var express = require('express');
  var router = express.Router();

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  var mongoose = require('mongoose');
  var Post = mongoose.model('Post');
  var Comment = mongoose.model('Comment')
  // Retrive Posts
  router.get('/posts', function(req, res, next) {
    Post.find(function(err, posts) {
      if (err) { next(err); }

      res.json(posts);
    })
  });
  // Create Posts
  router.post('/posts', function(req, res, next) {
    var post = new Post(req.body);

    post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(post);
    });
  });
  //Preload Posts
  router.param('post', function(req, res, next, id) {
    var query = Post.findById(id);

    query.exec(function (err, post){
      if (err) { return next(err); }
      if (!post) { return next(new Error('can\'t find post')); }

      req.post = post;
      return next();
    });
  });
  //Preload Comments
  router.param('comment', function(req, res, next, id) {
    var query = Comment.findById(id);

    query.exec(function (err, comment){
      if (err) { return next(err); }
      if (!post) { return next(new Error('can\'t find comment')); }

      req.comment = comment;
      return next();
    });
  });
  //Return a single comment
  router.get('/posts/:post', function(req, res) {
    req.post.populate('comments', function(err, post) {
    res.json(post);
  });
});
  //Upvote Posts
  router.put('/posts/:post/upvote', function(req, res, next) {
    req.post.upvote(function(err, post){
      if (err) { return next(err); }

      res.json(post);
    });
  });

  //Create Post Comments
  router.post('/posts/:post/comments', function(req, res, next) {
    var comment = new Comment(req.body);
    comment.post = req.post;

    comment.save(function(err, comment){
      if(err){ return next(err); }

      reg.post.comments.push(comment);
      reg.post.save(function(err, post) {
        if(err){ return next(err); }

        res.json(comment);
      });
    });
  });
  //Upvote Comment Posts
  router.put('/posts/:post/comments/:comment/upvote', function(req, res, next) {
    req.comment.upvote(function(err, comment ){
      if (err) { return next(err); }

      res.json(post);
    });
  });

  module.exports = router;
