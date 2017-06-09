'use strict';

require('dotenv').config();

const Config = require('./config/config');
const Twitter = require('twitter');
const Mongoose = require('mongoose');
const Tweet = require('./model/tweet').Tweet;
const Client = new Twitter(Config.twitterAPI);
const DateFormat = require('dateformat');
const _ = require('lodash');

Mongoose.connect(
  Config.database.prodUrl, 
  Config.database.options
);

const stream = Client.stream('statuses/filter', { track: Config.trackHashtag });

/* Twitter stream returns more than just tweets - Check the object reposnse. */
const isTweet = _.conforms({
  user: _.isObject,
  id_str: _.isString,
  text: _.isString,
});

stream.on('data', function(event) {
    
    if (isTweet(event)) {

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
        console.log('Tweet saved successfully!', data);
        if (err) {
          throw err;
        }
      });
    } else {
      console.log('Invalid Tweet!', event);
    };


});

stream.on('error', function(error) {
  // console.log('Stream error!', event);
  throw error;
});


