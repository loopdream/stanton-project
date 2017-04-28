'use strict';

require('dotenv').config();

const Hapi = require('hapi');
const mongoose = require('mongoose');
const config = require('./config/config.json');
const Tweet = require('./models/tweet');


mongoose.connect(process.env.MONGO_URI, config.mongodb.options);
const conn = mongoose.connection;              
conn.on('error', console.error.bind(console, 'connection error:'));  


const server = new Hapi.Server();
server.connection(config.server);


server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});


server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});


server.route( {
    method: 'GET',
    path: '/tweets',
    handler: function (request, reply) {
        Tweet.find({ processed: false }, function (err, tweets) {
          if (err) return console.error(err);
          // console.log(tweets);
          var html = '<ul>';
          for (var i = tweets.length - 1; i >= 0; i--) {
             html += '<li>' + tweets[i].tweet + '<br>' + tweets[i].created + '</li>';
          };
          html += '</ul>';

          reply('Tweets, <br>' + html + '!');
        });

    }
});
 

conn.once('open', function() { // Wait for the database connection to establish, then start the app.
  server.start((err) => {
      if (err) {
          throw err;
      }
      console.log(`Server running at: ${server.info.uri}`);
  });                 
});

