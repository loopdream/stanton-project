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
