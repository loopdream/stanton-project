'use strict';

const Hapi = require('hapi');
const Twitter = require('twitter');
const jsonfile = require('jsonfile')
const file = 'data.json'


const client = new Twitter({
  consumer_key: '4KacijLt6lalsDfrtOM1fm2jY',
  consumer_secret: 'LFH8Usa6pVcTLCpZWIvrX8KaFTjLWWdQk9PQxRc2pGW14sDqJe',
  access_token_key: '115021885-9D8lcervDM1nkNQIjMf8ORB77z2zGS7aRhnggMQH',
  access_token_secret: 'isu1FBDY8t7fFd7XLelUIfQcuI0Kir6myHg70v8mGY9EZ'
});



/* TWITTER STREAM */

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


});

stream.on('error', function(error) {
  throw error;
});


/* SERVER */

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
        
        //reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.route( {
    method: 'GET',
    path: '/tweets',
    handler: function (request, reply) {


    }
});

// server.start((err) => {
//     if (err) {
//         throw err;
//     }
//     console.log(`Server running at: ${server.info.uri}`);
// });
