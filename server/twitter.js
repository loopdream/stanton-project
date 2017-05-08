'use strict';

require('dotenv').config();

const Config = require('./config/config');
const Twitter = require('twitter');
const Mongoose = require('mongoose');
const Tweet = require('./model/tweet').Tweet;
const Client = new Twitter(Config.twitterAPI);
const DateFormat = require('dateformat');

Mongoose.connect(
  Config.database.prodUrl, 
  Config.database.options
);

const stream = Client.stream('statuses/filter', { track: Config.trackHashtag });

stream.on('data', function(event) {

    //var date = DateFormat(new Date(), "mmmm dS yyyy H:MM TT");

    var data = {
        tweetId: event.id,
        userId: event.user.id,
        userName: event.user.name,
        userHandle: event.user.screen_name,
        userLocation: event.user.location,
        tweet: event.text,
        created: event.created_at,
        date: new Date(),
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


