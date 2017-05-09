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
  		find({ processed: true }).
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
    // get latest unprocessed tweet
  	Tweet.
  		find({ processed: false }).
  		sort('-created').
  		limit(parseInt(request.params.limit)).
  		exec(function (err, tweet) {
	      if (!err) {
  
          // if a tweet is returned, update and mark as processed
          if (tweet.length) {
            // console.log(tweet[0].tweetId, tweet);
            Tweet.update({ tweetId: tweet[0].tweetId }, { $set: { processed: true }}, function (err, utweet) {
              if(err) {
                console.log('Error updating! ' + tweet[0].tweetId, tweet);
              } else {
                console.log('updating! ' + tweet[0].tweetId, tweet);
              }
            });
          };

          // console.log(tweet);
        
	        return reply(tweet);

	      }
	      return reply(Boom.badImplementation(err));  
	  	});
  }
};


 






 
