const Twitter = require('twitter');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/stanton');

var Tweet = require('./models/tweet');

const client = new Twitter({
  consumer_key: '4KacijLt6lalsDfrtOM1fm2jY',
  consumer_secret: 'LFH8Usa6pVcTLCpZWIvrX8KaFTjLWWdQk9PQxRc2pGW14sDqJe',
  access_token_key: '115021885-9D8lcervDM1nkNQIjMf8ORB77z2zGS7aRhnggMQH',
  access_token_secret: 'isu1FBDY8t7fFd7XLelUIfQcuI0Kir6myHg70v8mGY9EZ'
});

 
// Connection URL 
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


