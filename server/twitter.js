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

    // console.log(event);

    if (event && event.user && event !== undefined  ) {

      var data = {
          tweetId: event.id,
          userName: event.user !== undefined ? event.user.name : 'Anon',
          userHandle: event.user.screen_name !== undefined ? event.user.screen_name : 'Anon',
          userLocation: event.user.location !== undefined ? event.user.location : 'Someplace',
          tweet: event.text,
          created: event.created_at,
          date: new Date(),
          processed: false
      }

      var t = new Tweet(data);
      
      t.save(function(err) {
        if (err) {
          throw err;
        }
        console.log('Tweet saved successfully!');
      });


    };


});

stream.on('error', function(error) {
  throw error;
});


