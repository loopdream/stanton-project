'use strict';

require('dotenv').config();
const config = require('./config/config.json');
const Twitter = require('twitter');
const mongoose = require('mongoose');
const Tweet = require('./models/tweet');
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

mongoose.connect(
  process.env.MONGO_URI, 
  config.mongodb.options
);

const stream = client.stream('statuses/filter', {track: 'javascript'});

stream.on('data', function(event) {
  
    var data = {
        tweetId: event.id,
        userId: event.user.id,
        userName: event.user.screen_name,
        userLocation: event.user.location,
        tweet: event.text,
        created: event.created_at,
        processed: false
    }

    var t = new Tweet(data);
    
    t.save(function(err) {
      if (err) throw err;
      console.log('Tweet saved successfully!');
    });

});

stream.on('error', function(error) {
  throw error;
});


