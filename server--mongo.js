'use strict';

const Hapi = require('hapi');

const mongoDB = 'mongodb://localhost:27017/stanton';
const mongoose = require('mongoose');
mongoose.connect(mongoDB);

var Tweet = require('./models/tweet');

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });


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
          console.log(tweets);
          var html = '<ul>';
          for (var i = tweets.length - 1; i >= 0; i--) {
             html += '<li>' + tweets[i].tweet + '<br>' + tweets[i].created + '</li>';
          };
          html += '</ul>';

          reply('Tweets, <br>' + html + '!');
        });

    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
