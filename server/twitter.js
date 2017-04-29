'use strict';

require('dotenv').config();
const config = require('./config/config');
const Twitter = require('twitter');
const mongoose = require('mongoose');
const Tweet = require('./model/tweet').Tweet;
const client = new Twitter(config.twitterAPI);

mongoose.connect(
  config.database.prodUrl, 
  config.database.options
);

const stream = client.stream('statuses/filter', {track: 'javascript'});

stream.on('data', function(event) {
    
    var currentDate = new Date();

    var data = {
        tweetId: event.id,
        userId: event.user.id,
        userName: event.user.screen_name,
        userLocation: event.user.location,
        tweet: event.text,
        created: event.created_at,
        date: currentDate,
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


