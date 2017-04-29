'use strict';

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var tweetSchema = new Schema({
	tweetId: Number,
	userId: Number,
	userName: String,
	userLocation: String,
	tweet: String,
	created: String,
	processed: Boolean
});

// the schema is useless so far
// we need to create a model using it
var tweet = mongoose.model('Tweet', tweetSchema);

// make this available to our users in our Node applications
module.exports = {
  Tweet : tweet
};