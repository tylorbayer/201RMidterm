var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Conference = mongoose.model('Conference');

router.get('/conferences', function(req, res, next) {
  Conference.find(function(err, conferences){
    if(err){ return next(err); }
    res.json(conferences);
  });
});

router.post('/conferences', function(req, res, next) {
  var conference = new Conference(req.body);
  conference.save(function(err, conference){
    if(err){ return next(err); }
    res.json(conference);
  });
});

router.param('conference', function(req, res, next, id) {
  var query = Conference.findById(id);
  query.exec(function (err, conference){
    if (err) { return next(err); }
    if (!conference) { return next(new Error("can't find conference")); }
    req.conference = conference;
    return next();
  });
});

router.get('/conferences/:conference', function(req, res) {
  res.json(req.conference);
});

router.put('/conferences/:conference/upvote', function(req, res, next) {
  req.conference.upvote(function(err, conference){
    if (err) { return next(err); }
    res.json(conference);
  });
});

router.delete('/conferences/:conference', function(req, res) {
  console.log("in Delete");
  req.conference.remove();
  res.json(req.conference);
});
module.exports = router;
