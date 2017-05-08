'use strict';

var Joi = require('joi'),
  Boom = require('boom'),
  Tweet = require('../model/tweet').Tweet,
  mongoose = require('mongoose');


exports.getAll = {
  handler: function (request, reply) {
    Tweet.find({}, function (err, tweet) {
      if (!err) {
        return reply(tweet);
      }
      return reply(Boom.badImplementation(err)); // 500 error
    });
  }
};

exports.getOne = {
  handler: function (request, reply) {
    Tweet.findOne({ 'tweetId': request.params.tweetId }, function (err, tweet) {
      if (!err) {
        return reply(tweet);
      }
      return reply(Boom.badImplementation(err)); // 500 error
    });
  }
};

exports.getLatest = {
  handler: function (request, reply) {
  	Tweet.
  		find({ processed: false }).
  		sort('-created').
  		exec(function (err, tweet) {
	      if (!err) {
	        return reply(tweet);
	      }
	      return reply(Boom.badImplementation(err));  
	  	});
  }

};
 
 

exports.getLatestLimit = {
  handler: function (request, reply) {
  	Tweet.
  		find({ processed: false }).
  		sort('-created').
  		limit(parseInt(request.params.limit)).
  		exec(function (err, tweet) {
	      if (!err) {
          
          Tweet.update({ _id: tweet._id }, { $set: { processed: true }}, function (err, utweet) {
            if(err) {
              console.log('Error updating! ' + utweet.userName, tweet);
            } else {
              console.log('updating! ' + utweet.userName, tweet);
            }
          });
        
	        return reply(tweet);
	      }
	      return reply(Boom.badImplementation(err));  
	  	});
  }
};
 
