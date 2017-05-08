'use strict';

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var tweetSchema = new Schema({
	tweetId: Number,
	userId: Number,
	userName: String,
	userHandle: String,
	userLocation: String,
	tweet: String,
	created: String,
	date: String,
	processed: {
        type: Boolean,
        default: false
    }
});

// the schema is useless so far
// we need to create a model using it
var tweet = mongoose.model('Tweet', tweetSchema);

// make this available to our users in our Node applications
module.exports = {
  Tweet : tweet
};