'use strict';

require('dotenv').config();

const Hapi = require('hapi');
const Routes = require('./routes');
const Db = require('./config/db');
const Config = require('./config/config');
const Tweet = require('./model/tweet').Tweet;

const app = {};
app.config = Config;

const server = new Hapi.Server();
server.connection( Config.server );
const io = require('socket.io')(server.listener);


server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }
    server.route(Routes.endpoints);

    server.start((err) => {

        if (err) {
            throw err;
        }

        io.on('connection', function (socket) {

            setInterval(() => {

              Tweet.
                find({ processed: false }).
                sort('-created').
                limit(1).
                exec(function (err, tweet) {
                  if (!err) {
                    // if a tweet is returned, update and mark as processed
                    if (tweet.length) {
                      Tweet.update({ tweetId: tweet[0].tweetId }, { $set: { processed: true }}, function (err, utweet) {
                        if(err) {
                          console.log('Error updating! ' + tweet[0].tweetId, tweet);
                        } 
                      });
                    };
                    // console.log(tweet);
                    return socket.emit('tweet', tweet);
                  }
                  return err;  
                });
              
            }, 10000);
                   
        });

        console.log('Server running at:', server.info.uri);
    });
    
});



